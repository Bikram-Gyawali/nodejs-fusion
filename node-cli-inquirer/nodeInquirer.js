const axios = require("axios");
const inquirer = require("inquirer")(async () => {
  try {
    const answers = await getAnswers();

    console.log("Calling API(s) might take some time...");
    for (const option of answers.options) {
      if (option === "gender") {
        await guessGender(answers.firstName);
      }

      if (option === "nationality") {
        await guessNationality(answers.firstName);
      }
    }
  } catch (err) {
    console.error(
      `There was an error while talking to the API: ${err.message}`,
      err
    );
  }
})();

function getAnswers() {
  return inquirer.prompt([
    {
      name: "firstName",
      message: "What is your first name?",
      type: "input",
      validate: (firstName) => {
        if (!firstName.length) {
          return "Please provide a first name";
        }
        if (firstName.length <= 3 || firstName.length > 20) {
          return "Please provider a first name between 4 and 20 characters long";
        }

        return true;
      },
      filter: (firstName) => {
        return firstName.trim();
      },
    },
    {
      name: "options",
      message: "What would you like to guess for the given first name?",
      type: "checkbox",
      choices: ["gender", "nationality"],
      validate: (options) => {
        if (!options.length) {
          return "Choose at least one of the above, use space to choose the option";
        }

        return true;
      },
    },
  ]);
}

async function guessGender(firstName) {
  const response = await axios.get(
    `https://api.genderize.io/?name=${firstName}`
  );
  const { gender, probability } = response.data;
  console.log(
    `The API guessed the gender for ${firstName} to be ${gender} with ${(
      probability * 100
    ).toFixed(2)}% probability`
  );
}

async function guessNationality(firstName) {
  const response = await axios.get(
    `https://api.nationalize.io/?name=${firstName}`
  );
  const { country } = response.data;
  if (!country || !country[0]) {
    console.log(
      `The API could not guess the nationality for the name ${firstName}`
    );
    return;
  }
  //can use this API to get country name from ISO 2 - http://api.worldbank.org/v2/country/np?format=json
  console.log(
    `The API guessed the nationality for ${firstName} to be ${
      country[0].country_id
    } with the highest probability of ${(country[0].probability * 100).toFixed(
      2
    )}%`
  );
}
