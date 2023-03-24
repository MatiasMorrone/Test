# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1- I will create another property in the Agents schema called customIds, this property will be an object where the keys are the ids of the facility and the values are the customId assigned by the facility to that particular agent. This will be an optional property in the schema because at the moment of creation of the agent it wont have any customId to be assigned.
2- I will add the create and update mutation for this new feature to modify the database, we can be sure that the Agent has worked in this facility because of the next step, so there is no need to check it.
3- I will create the interface for the user to add this information, for that we would call the getShiftsByFacility (prior adding this new property in the request of data from the database and add it in the response of the function), the user would get the metadata of the agents shown on the screen (only one time each agent and the neccesary metadata being firstName, lastName, occupation) and they will have an input next to the listed data in which they would be able to fill the customID if its not filled yet or an input but with the initial value of the current customID. We will also generate an array of the existing customsIds from the database in that facility by getting all the agents customsIds with the FacilityID (in the code, not shown to the user), with that we would verify on creation and modification (the input data) if the customId has already been added, in that case show an alert to the user informing this situation, if not, then send the request to update the database.
4- I will add this new property in the fuction generateReport when we request the data from the schema, then in the report if we have any customID in that agent for that facility then we show the customID if not we show our regular id.
5- I will create new unit test for this new feature in order to test that we can add and modify this new property and that we cannot add an already used customID, also modify the existing unit tests of the getShiftsByFacility and generateReport to ensure that if we do have the data its being used in a correct way.

This full ticket will take me 2 days, being that step 1 and 4 need just a modification of the existing code, the step 2 the creation of 2 new routes to modify our database, the 3 step the creation of the interface for this new feature and the 5 step the needed test to ensure that our new feature is working 