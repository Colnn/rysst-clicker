import { useEffect, useState } from "react";

export default function motivationalTexts() {
  const gamePhase1 = [
    "Your icebergs are chillingly famous in the Arctic Circle!",
    "Passersby can't stop talking about the majestic beauty of your icebergs!",
    "Newsflash: Your icebergs have become the coolest topic in global conversations!",
    "Scientists are baffled by the phenomenon of your ever-growing icebergs!",
    "The rumor mill is buzzing about your legendary iceberg empire!",
    "Whispers of your extraordinary icebergs have reached the penguins in Antarctica!",
    "Your icebergs are making waves, figuratively and literally!",
    "In a surprising turn of events, your icebergs are now trending on social media!",
    "Local folklore attributes magical powers to your magnificent icebergs!",
    "Tourists travel from afar just to catch a glimpse of your iconic icebergs!",
  ];
  const gamePhase2 = [
    "Word on the frosty street is that your icebergs are the new symbol of elegance!",
    "Your icebergs are so legendary that they've inspired a hit song in the Antarctic Top 40!",
    "Locals can't resist snapping selfies with your awe-inspiring icebergs in the background!",
    "A magazine cover featuring your icebergs is creating a sensation in the polar publishing world!",
    "Whale enthusiasts claim your icebergs are the preferred hangout spot for the ocean's coolest residents!",
    "Eskimos are considering renaming their villages in honor of your monumental icebergs!",
    "The global ice sculpting community is in awe of your naturally crafted icebergs!",
    "Your icebergs have become the subject of poetry, capturing the hearts of icy romantics!",
    "The rumor mill suggests that even yetis are planning a visit to admire your grand icebergs!",
    "Your icebergs are so enchanting that even the northern lights seem to dance in celebration!",
  ];
  const gamePhase3 = [
    "Your icebergs are the talk of the town, with local penguins starting an iceberg appreciation club!",
    "Rumor has it, your icebergs have been featured in a documentary narrated by Morgan Freeman!",
    "Iceberg scientists are considering creating a new category just for your uniquely majestic ice formations!",
    "In a surprising turn of events, your icebergs are now featured in the curriculum of icebergology classes!",
    "Travel agencies are promoting 'Iceberg Safari Tours' to witness the grandeur of your frozen wonders!",
    "The Iceberg Clicker craze has led to a spike in iceberg-themed fashion, with iceberg-patterned clothing flying off the shelves!",
    "Local businesses are renaming their products to include 'Iceberg' – from Iceberg Lattes to Iceberg-shaped cookies!",
    "Your icebergs have become so iconic that artists are sculpting miniature replicas for gallery exhibitions!",
    "Adventurous souls are attempting iceberg climbing, hoping to reach the summit of your colossal ice creations!",
    "The mayor has declared a citywide Iceberg Day, celebrating the impact of your frozen empire on the community!",
  ];
  const gamePhase4 = [
    "Your icebergs have achieved celebrity status, with cameo appearances in blockbuster movies as the ultimate frozen marvels!",
    "A renowned ice sculptor has offered to create a replica of your largest iceberg for display at an international art exhibition!",
    "Scientists are studying the mystical aura surrounding your icebergs, trying to unlock their secrets of frosty fascination.",
    "Your icebergs have inspired a line of iceberg-themed merchandise, from t-shirts to snow globes, creating a craze among collectors!",
    "An iceberg-themed dance craze is sweeping through the polar bear community, thanks to the rhythm of your frozen masterpieces!",
    "Your icebergs have become the subject of poetry slams, with poets crafting verses that capture the essence of their icy allure.",
    "The United Nations is considering declaring your icebergs a global heritage site, recognizing their monumental impact on the world.",
    "In an unusual twist, fortune tellers claim your icebergs hold the key to predicting the future of polar climates!",
    "Your icebergs have sparked a culinary revolution, with chefs incorporating iceberg-inspired dishes on gourmet menus worldwide!",
    "Environmentalists are praising your sustainable iceberg harvesting practices, setting a new standard for icy resource management!",
  ];
  const [time, setTime] = useState(new Date());
  const [text, setText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 10000);

    return () => {
      clearInterval(interval);
      setText(() => {
        const random = Math.floor(Math.random() * 10);
        return gamePhase1[random];
      });
    };
  }, []);

  return (
    <>
      <p>{text}</p>
    </>
  );
}
