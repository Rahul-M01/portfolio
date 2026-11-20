import cyanDrive from '../assets/covers/cyan-drive.webp';
import cyanDriveSmall from '../assets/covers/cyan-drive-640.webp';
import music from '../assets/covers/headphones.webp';
import musicSmall from '../assets/covers/headphones-640.webp';
import reel from '../assets/covers/film-reel.webp';
import reelSmall from '../assets/covers/film-reel-640.webp';
import goldNib from '../assets/covers/gold-nib.webp';
import goldNibSmall from '../assets/covers/gold-nib-640.webp';
import card from '../assets/covers/bank-card.webp';
import cardSmall from '../assets/covers/bank-card-640.webp';
import rover from '../assets/covers/code-editor.webp';
import roverSmall from '../assets/covers/code-editor-640.webp';
import greenRack from '../assets/covers/green-rack.webp';
import greenRackSmall from '../assets/covers/green-rack-640.webp';
import atlantis from '../assets/covers/booster-landing.webp';

export const photographs = {
    '/homelab': {
        large: cyanDrive, small: cyanDriveSmall, width: 1680, height: 945,
        subject: 'An exposed hard drive with a cyan reflection across the platter.', credit: 'Borja Verbena',
        source: 'https://unsplash.com/photos/a-close-up-of-a-hard-drive-on-a-black-background-qDMSjXRylqU', focus: '50% 50%',
    },
    '/bot': {
        large: music, small: musicSmall, width: 1680, height: 945,
        subject: 'Black studio headphones outlined in gold light.', credit: 'Amin Asbaghipour',
        source: 'https://unsplash.com/photos/black-and-gray-headphones-on-black-background-qIPxIMDdQXk', focus: '50% 50%',
    },
    '/drishyam': {
        large: reel, small: reelSmall, width: 1672, height: 941,
        subject: 'A film reel unwinds to reveal three frames of a lunar landscape.', focus: '80% 55%',
    },
    '/lekhak': {
        large: goldNib, small: goldNibSmall, width: 1680, height: 945,
        subject: 'An engraved gold fountain pen nib on dark fabric.', credit: 'Rose Miller',
        source: 'https://unsplash.com/photos/gold-and-silver-fountain-pen-CC_kzFrwqiA', focus: '52% 50%',
    },
    '/kubera': {
        large: card, small: cardSmall, width: 1672, height: 941,
        subject: 'A black payment card, a curled receipt and copper coins.', focus: '72% 56%',
    },
    '/yudhishtra': {
        large: rover, small: roverSmall, width: 1680, height: 945,
        subject: 'A dark code editor beside a warm desk lamp.', credit: 'Harshit Katiyar',
        source: 'https://unsplash.com/photos/computer-screen-displaying-lines-of-code-5sLNGV2EFRM', focus: '50% 50%',
    },
    '/drishti': {
        large: greenRack, small: greenRackSmall, width: 1680, height: 945,
        subject: 'Green light falls across a server rack and its row of status LEDs.', credit: 'Tyler',
        source: 'https://unsplash.com/photos/a-close-up-of-a-computer-with-green-lights-ekF932HpB4M', focus: '55% 50%',
    },
    'https://rahul-m01.github.io/simulation/': {
        large: atlantis, small: atlantis, width: 600, height: 337,
        subject: 'A Falcon 9 first stage landing at Cape Canaveral in December 2015.', credit: 'SpaceX via DVIDS',
        source: 'https://www.dvidshub.net/image/2343195/45th-space-wing-successfully-launches-orbcomm-historically-lands-first-stage-booster', focus: '50% 55%',
    },
};
