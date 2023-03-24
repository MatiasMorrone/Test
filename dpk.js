const crypto = require("crypto");

exports.deterministicPartitionKey2 = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};
exports.deterministicPartitionKey = (event) => {
  if(!event) return "0"
  if(event.partitionKey) return JSON.stringify(event.partitionKey)
  const candidate = crypto.createHash("sha3-512").update(JSON.stringify(event)).digest("hex")
  return (candidate.length > 256) ? crypto.createHash("sha3-512").update(candidate).digest("hex") : candidate;
};
// The modifications being made recognize that since we dont check if we have an event in negative way we have to check also that the 
// candidate has value, beside that case if we have "event" we only need to make sure if we have an object type with the key partitionKey
// In which case we want the value of that key as string, the rest of the cases we want to encript the value and return the string, with
// the special case in which the first encripted value result in a string longer than 256 characters in that case we encripte it again. 
