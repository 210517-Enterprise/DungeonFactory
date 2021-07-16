import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function CharacterCreator() {


    const [races, updateRaces] = useState([]);
    const [classes, updateClasses] = useState([]);
    const [character, updateCharacter] = useState(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            race: "",
            class: "",
            strength: "",
            constitution: "",
            intelligence: "",
            wisdom: "",
            dexterity: "",
            charisma: "",
            characterName: ""

        }
    });

    async function onSubmit(data) {
        const requestInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ race: data.race, characterClass: data.class, strength: data.strength, constitution: data.constitution, intelligence: data.intelligence, wisdom: data.wisdom, dexterity: data.dexterity, charisma: data.charisma, characterName: data.characterName }),
            credentials: 'include'
        };

        const response = await fetch('http://localhost:8080/character/', requestInfo);
        updateCharacter(await response.json());


    }

    async function getRaces() {
        const response = await fetch("https://www.dnd5eapi.co/api/races/");
        const races = await response.json();
        updateRaces(races.results);
    }

    async function getClasses() {
        const response = await fetch("https://www.dnd5eapi.co/api/classes/")
        const classes = await response.json();
        updateClasses(classes.results)

    }

    useEffect(() => {
        getRaces();
        getClasses();
    }, []);


    return races.length === 0 || classes.length === 0 ? (
        <p>Loading Data</p>
    ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>{(character) ? <Redirect to="./Characters" /> : ""}</div>
            <div class="race">
                <label for="Race Select">Select a Race</label>
                <select {...register("race")} >
                    {races.map((result) => {
                        return <option value={result.name}>{result.name}</option>
                    })}
                </select>
            </div>

            <div class="className">
                <label for="Class Select">Select a Class</label>
                <select {...register("class")}>
                    {classes.map((result) => {
                        return <option value={result.name}>{result.name}</option>
                    })}
                </select>
            </div>

            <div class="abilities">
                <label for="constitution">Constitution</label>
                <input {...register("constitution", { required: true })}>
                </input>
                
                <label for="charisma">Charisma</label>
                <input {...register("charisma", { required: true })}>
                </input>

                <label for="dexterity">Dexterity</label>
                <input {...register("dexterity", { required: true })}>
                </input>

                <label for="intelligence">Intelligence</label>
                <input {...register("intelligence", { required: true })}>
                </input>

                <label for="wisdom">Wisdom</label>
                <input {...register("wisdom", { required: true })}>
                </input>

                <label for="strength">Strength</label>
                <input {...register("strength", { required: true })}>
                </input>
            </div>

            <div class="characterName">
            <label for="characterName">Character Name</label>
                <input {...register("characterName", { required: true })}>
                </input>

            </div>

            <input type="submit" />
        </form>
    )
}
