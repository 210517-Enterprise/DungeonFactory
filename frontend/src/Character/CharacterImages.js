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