import frigate from '../../assets/frigate.png';
import hawk from '../../assets/hawk.png';
import shadow from '../../assets/shadow.png';
import starfighter from '../../assets/starfighter.png';
import serpent from '../../assets/serpent.png';

export default function loadImage(name) {
    switch (name) {
        case "shadow":
            return shadow;

        case "frigate":
            return frigate;
        
        case "serpent":
            return serpent;

        case "hawk":
            return hawk;

        default:
            return starfighter;
    }
}