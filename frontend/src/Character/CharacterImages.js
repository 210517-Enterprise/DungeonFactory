// Race icons
import dragonborn from './races/dragonborn.png'
import dwarf from './races/dwarf.png'
import elf from './races/elf.png'
import gnome from './races/gnome.png'
import halfElf from './races/half-elf.png'
import halfOrc from './races/half-orc.png'
import halfling from './races/halfling.png'
import human from './races/human.png'
import tiefling from './races/tiefling.png'
// Class icons
import barbarian from './icons/barbariandark.png'
import bard from './icons/barddark.png'
import cleric from './icons/clericdark.png'
import druid from './icons/druiddark.png'
import fighter from './icons/fighterdark.png'
import monk from './icons/monkdark.png';
import paladin from './icons/paladindark.png'
import ranger from './icons/rangerdark.png'
import rogue from './icons/roguedark.png'
import sorcerer from './icons/sorcererdark.png';
import warlock from './icons/warlockdark.png';
import wizard from './icons/wizarddark.png';

export function classToPng(className) {
    if (className === "Barbarian") {
        return barbarian;
    } else if (className === "Bard") {
        return bard;
    } else if (className === "Cleric") {
        return cleric;        
    } else if (className === "Druid") {
        return druid;        
    } else if (className === "Fighter") {
        return fighter;        
    } else if (className === "Monk") {
        return monk;
    } else if (className === "Paladin") {
        return paladin;        
    } else if (className === "Ranger") {
        return ranger;        
    } else if (className === "Rogue") {
        return rogue;        
    } else if (className === "Sorcerer") {
        return sorcerer;
    } else if (className === "Warlock") {
        return warlock;        
    } else if (className === "Wizard") {
        return wizard;        
    }
}

export function raceToPng(raceName) {
    if (raceName === "Dragonborn"){
        return dragonborn;
    } else if (raceName === "Dwarf") {
        return dwarf;
    } else if (raceName === "Elf") {
        return elf;
    } else if (raceName === "Gnome") {
        return gnome;
    } else if (raceName === "Half-Elf") {
        return halfElf;
    } else if (raceName === "Half-Orc") {
        return halfOrc;
    } else if (raceName === "Halfling") {
        return halfling;
    } else if (raceName === "Human") {
        return human;
    } else if (raceName === "Tiefling") {
        return tiefling;
    }
}

export function classToDesc(className) {
    if (className === "Barbarian") {
        return "A fierce warrior of primitive background who can enter a battle rage";
    } else if (className === "Bard") {
        return "An inspiring magician whose power echoes the music of creation";
    } else if (className === "Cleric") {
        return "A priestly champion who wields divine magic in service of a higher power";
    } else if (className === "Druid") {
        return "A priest of the Old Faith, wielding the powers of nature — moonlight and plant growth, fire and lightning — and adopting animal forms";
    } else if (className === "Fighter") {
        return "A master of martial combat, skilled with a variety of weapons and armor";
    } else if (className === "Monk") {
        return "A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection";
    } else if (className === "Paladin") {
        return "A holy warrior bound to a sacred oath";
    } else if (className === "Ranger") {
        return "A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization";
    } else if (className === "Rogue") {
        return "A scoundrel who uses stealth and trickery to overcome obstacles and enemies";
    } else if (className === "Sorcerer") {
        return "A spellcaster who draws on inherent magic from a gift or bloodline";
    } else if (className === "Warlock") {
        return "A wielder of magic that is derived from a bargain with an extraplanar entity";
    } else if (className === "Wizard") {
        return "A scholarly magic-user capable of manipulating the structures of reality";
    }
}