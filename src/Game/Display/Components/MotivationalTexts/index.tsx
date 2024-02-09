import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import useStyle from './style';

export default function MotivationalTexts() {
  const classes = useStyle();

  const gamePhase1 = [
    'Your RYSST-grains are legendary across the land!',
    'RYSST-grain enthusiasts from far and wide flock to witness your abundance!',
    'The aroma of your freshly harvested RYSST-grains permeates the air, drawing admirers near.',
    "Whispers of your RYSST-grains' excellence spread like wildfire among the townsfolk.",
    "Word has it that your RYSST-grains have a fan club – and it's growing!",
    'In every corner of the kingdom, tales of your bountiful RYSST-grain harvest are told.',
    'RYSST-grain aficionados declare your crops as the epitome of perfection.',
    'Travelers pass through, not for the scenery, but for a taste of your renowned RYSST-grains.',
    'Your RYSST-grains are the talk of the town, sparking envy among fellow grain enthusiasts.',
    'The RYSST-grain industry bows down to your unparalleled success and prosperity.',
  ];
  const gamePhase2 = [
    'Gossips about your RYSST-grains have reached neighboring kingdoms, making you a grain tycoon.',
    'The RYSST-grain market trembles at the sheer magnitude of your harvest.',
    'Your RYSST-grains have achieved a level of excellence that rivals even the finest of culinary delights.',
    'Local poets compose verses dedicated to the mesmerizing allure of your golden RYSST-grains.',
    'The town crier proclaims your RYSST-grain fields as the eighth wonder of the world.',
    'Rumors swirl that your RYSST-grains possess magical properties, enchanting all who taste them.',
    "Your RYSST-grains are so sought after that they've become a symbol of prosperity and abundance.",
    'Every grain in your harvest seems to tell a story of resilience and success.',
    'The mayor himself requests a special delivery of your finest RYSST-grains for the upcoming festival.',
    'Your RYSST-grain empire is the stuff of legends, inspiring aspiring farmers across the realm.',
  ];
  const gamePhase3 = [
    'RYSST-grain enthusiasts journey from distant lands to witness the marvel of your flourishing fields.',
    'The aroma of your RYSST-grains is said to have healing properties, drawing admirers seeking wellness.',
    'Your RYSST-grains have become the centerpiece of grand feasts, captivating the most discerning palates.',
    'Legends are spun about the mystical origins of your extraordinary, otherworldly RYSST-grains.',
    'A bard has composed a ballad in honor of your RYSST-grains, sung in taverns throughout the kingdom.',
    'Noble families vie for the privilege of hosting banquets adorned with your exquisite RYSST-grains.',
    'The Royal Court recognizes your contribution, declaring your RYSST-grains a national treasure.',
    'Your RYSST-grains are so coveted that even neighboring kingdoms offer alliances for a taste.',
    'Visitors claim your RYSST-grains have a unique, unforgettable crunch that sets them apart.',
    'In the moonlit nights, farmers secretly wish for a sprinkle of your magic to bless their own crops.',
  ];
  const gamePhase4 = [
    'The wise elders of the village attribute the prosperity of the land to the enchantment within your RYSST-grains.',
    'As the RYSST-grain magnate, your fields are a beacon of hope in times of agricultural uncertainty.',
    'In hushed tones, rivals concede that your RYSST-grains have set an insurmountable standard for excellence.',
    'Magicians from the mystical realm seek your secret to growing RYSST-grains with such ethereal quality.',
    'Your RYSST-grains have become a symbol of unity, bringing together people from diverse backgrounds to appreciate your harvest.',
    'During festivals, artisans sculpt statues in the likeness of your prized RYSST-grains, immortalizing their glory.',
    'Ancient prophecies foretell that the fate of the kingdom is intertwined with the abundance of your RYSST-grains.',
    'The RYSST-grain Guild sends emissaries to learn the secrets of your unparalleled cultivation techniques.',
    'Rumors spread that even the wildlife in your fields is blessed by the presence of your extraordinary RYSST-grains.',
    'Your RYSST-grains are said to possess a subtle sweetness that dances on the taste buds like a culinary masterpiece.',
  ];
  const [text, setText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setText(() => {
        return gamePhase1[Math.floor(Math.random() * 10)];
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setText(gamePhase1[Math.floor(Math.random() * 10)]);
  }, []);

  return (
    <>
      <Box className={classes.motivationalTexts}>{text}</Box>
    </>
  );
}
