export const SelectTravelsList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun-loving adventurers",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "⛵",
    people: "5 to 10 People",
  },
];

export const SelectBudgetList = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵",
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰",
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💸",
  },
];

export const AI_PROMPT =
  "Generate a {noOfDays} day itinerary for a {traveller} visiting location : {location} on a {budget} budget. The plan should include a list of budget-friendly hotel options, each with details such as the hotel name, address, price per night, image URL, geo coordinates (latitude and longitude), rating, and a brief description. Additionally, suggest a day-wise itinerary with places to visit, including the place name, description, image URL, geo coordinates, ticket pricing (if applicable), rating, estimated travel time from the hotel to the location, and the best time to visit (either seasonally or time of day). Ensure the plan is cost-effective by recommending budget-friendly or free attractions and activities, balancing a mix of relaxation and exploration suitable for the couples preferences. Provide the output in JSON format.";
