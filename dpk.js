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

