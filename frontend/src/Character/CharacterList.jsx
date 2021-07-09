import React from 'react';

class CharacterList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            characters: []
        }


    }

  
    async componentDidMount() {
        //fetch('')
        this.setState( {
            characters : [
                    {
                        id: 1,
                        race: 'dwarf',
                        class: 'priest',
                    },
                    {
                        id: 2,
                        race: 'elf',
                        class: 'test',
                    },   
            ]
        })
        // .then(res => res.json())
        // .then(result =>  {
        //     this.setState({
        //         characters: result
        //     });
        // });
    }


    render() {
        const { currentUser } = this.props;
        const { characters } = this.state;
        return (//<div>Character List</div>
        
        <ul>
            {characters.map(character => (
                
                <li key= {character.id}>
                    <h3>{character.race}</h3> 
                    <h4>{character.class}</h4>  
                </li>
            ))}
        </ul>
        );
    }
}

export default CharacterList