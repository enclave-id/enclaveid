import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  return await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password',
      confirmedAt: new Date(),
      userTraits: {
        create: {
          bigFive: {
            create: {
              openness: 95,
              conscientiousness: 30,
              extraversion: 5,
              agreeableness: 50,
              neuroticism: 75,
              summary: "This is a summary of the user's big five traits.",
            },
          },
          sixteenPersonalityFactor: {
            create: {
              warmth: 40,
              reasoning: 60,
              emotionalStability: 30,
              dominance: 80,
              liveliness: 25,
              ruleConsciousness: 55,
              socialBoldness: 20,
              sensitivity: 75,
              vigilance: 35,
              abstractedness: 65,
              privateness: 45,
              apprehension: 70,
              opennessToChange: 25,
              selfReliance: 55,
              perfectionism: 35,
              tension: 80,
              summary:
                "This is a summary of the user's sixteen personality factors.",
            },
          },
          mbti: {
            create: {
              extraversion: true,
              sensing: false,
              thinking: true,
              judging: true,
              summary: "This is a summary of the user's MBTI type.",
            },
          },
          politcalCompass: {
            create: {
              economic: 5,
              social: 5,
              summary: "This is a summary of the user's political compass.",
            },
          },
          moralFoundations: {
            create: {
              careHarm: 5,
              fairnessCheating: 5,
              loyaltyBetrayal: 5,
              authoritySubversion: 5,
              sanctityDegradation: 5,
              summary: "This is a summary of the user's moral foundations.",
            },
          },
          riasec: {
            create: {
              realistic: 5,
              investigative: 5,
              artistic: 5,
              social: 5,
              enterprising: 5,
              conventional: 5,
              summary: "This is a summary of the user's RIASEC type.",
            },
          },
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
