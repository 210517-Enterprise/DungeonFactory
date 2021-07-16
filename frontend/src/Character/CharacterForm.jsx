import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function CharacterForm() {
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
            body: JSON.stringify({ race: data.race, character_class: data.class, strength: data.strength, constitution: data.constitution, intelligence: data.intelligence, wisdom: data.wisdom, dexterity: data.dexterity, charisma: data.charisma, character_name: data.characterName }),
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

    const characterForm = (
        <div className="">
            <div className="form-header">
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>{(character) ? <Redirect to="./Characters"/> : ""}</div>
                <div className="race">
                    <label htmlFor="Race Select">Select a Race</label>
                    <select {...register("race")} >
                        {races.map((result) => {
                            return <option value={result.name}>{result.name}</option>
                        })}
                    </select>
                </div>

                <div className="className">
                    <label htmlFor="Class Select">Select a Class</label>
                    <select {...register("class")}>
                        {classes.map((result) => {
                            return <option value={result.name}>{result.name}</option>
                        })}
                    </select>
                </div>

                <div className="abilities">
                    <label htmlFor="constitution">Constitution</label>
                    <input {...register("constitution", {required: true})}>
                    </input>

                    <label htmlFor="charisma">Charisma</label>
                    <input {...register("charisma", {required: true})}>
                    </input>

                    <label htmlFor="dexterity">Dexterity</label>
                    <input {...register("dexterity", {required: true})}>
                    </input>

                    <label htmlFor="intelligence">Intelligence</label>
                    <input {...register("intelligence", {required: true})}>
                    </input>

                    <label htmlFor="wisdom">Wisdom</label>
                    <input {...register("wisdom", {required: true})}>
                    </input>

                    <label htmlFor="strength">Strength</label>
                    <input {...register("strength", {required: true})}>
                    </input>
                </div>

                <div className="characterName">
                    <label htmlFor="characterName">Character Name</label>
                    <input {...register("characterName", {required: true})}>
                    </input>

                </div>

                <input type="submit"/>
            </form>
        </div>
    )

    if (races.length === 0 || classes.length === 0) {
        return <p>Loading Data</p>
    } else {
        return characterForm;
    }
}
