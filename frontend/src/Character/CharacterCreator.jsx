import { race } from "q";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router";

export default function CharacterCreator() {


    const [ races, updateRaces ] = useState([]);
    const [ character, updateCharacter ] = useState(null);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            race: ""
        }
    });

    async function onSubmit(data) {
        const requestInfo = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ race: data.race }),
            credentials: 'include'
        };

        const response = await fetch('http://localhost:8080/character/create', requestInfo);
        updateCharacter(await response.json());
    }

    async function getRaces() {
        const response = await fetch("https://www.dnd5eapi.co/api/races/");
        const races = await response.json();
        updateRaces(races.results);
    }

    useEffect(() => {
        getRaces()
    }, []);

    return races.length === 0 ? (
        <p>Loading Data</p>
    ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>{(character) ? <Redirect to="./Characters"/> : ""}</div>
            <div class="race">
                <label for="Race Select">Select a Race</label>
                <select {...register("race")} >
                    {races.map((result) => {
                        return <option value={result.name}>{result.name}</option>
                    })}
                </select>
                <input type="submit" />
            </div>
        </form>
    ) 
}