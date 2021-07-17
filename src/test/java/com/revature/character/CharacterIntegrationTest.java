package com.revature.character;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.javafaker.Faker;
import com.revature.DungeonFactoryApplication;
import com.revature.user.User;
import com.revature.user.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Class defines the character integration tests
 * @author Frank Aurori, Derek Dinh, Frederick Thornton
 *
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DungeonFactoryApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class CharacterIntegrationTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    UserService userService;

    @Autowired
    CharacterService characterService;

    ObjectMapper objectMapper = new ObjectMapper();

    Faker faker = new Faker();
    
    /**
     * Method creates a random user 
     * @return user
     */
    public User randomUser() {
        User u = new User();
        u.setUsername(faker.name().firstName());
        u.setPassword(faker.pokemon().name());
        userService.insert(u);
        return u;
    }
    
    /**
     * Method creates a random character
     * @param user
     * @return character
     */
    public Character randomCharacter(User u) {
        Faker faker = new Faker();
        Character c = new Character();
        c.setRace("elf");
        c.setCharacterName(faker.name().fullName());
        c.setCharacterClass(faker.job().title());
        c.setAlignment(faker.job().keySkills());
        c.setBackground(faker.job().position());
        c.setPersonality(faker.job().keySkills());
        c.setIdeals(faker.ancient().hero());
        c.setBonds(faker.superhero().power());
        c.setFlaws("Liar");
        c.setFeatAndTraits(faker.superhero().descriptor()); 
        c.setOwner(u);
        characterService.insert(c);
        return c;
    }
    
    /**
     * Method to test a valid character create
     * @throws Exception
     */
    @Test
    public void testValidCharacterCreate() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        ObjectNode character = objectMapper.createObjectNode();
        character.put("race", "elf");
        character.put("characterClass", "wizard");
        character.put("characterName", "foo");
        character.put("background", c.getBackground());
        character.put("alignment", c.getAlignment());
        character.put("personality", c.getPersonality());
        character.put("ideals", c.getIdeals());
        character.put("bonds", c.getBonds());
        character.put("flaws", c.getFlaws());
        character.put("featAndTraits", c.getFeatAndTraits());
        
        mvc.perform(post("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content(character.toString())
                .sessionAttr("user", u))
                .andExpect(status().isOk());
    }
    
    /**
     * Method to test a find valid character by id
     * @throws Exception
     */
    @Test
    public void testValidFindByCharacterId() throws Exception {
        User u = new User();
        u.setUsername("woo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(u);
        c.setCharacterClass("wizard");
        c.setCharacterName("woobar");
        c.setBackground("athlete");
        c.setAlignment("judge");
        c.setPersonality("funny");
        c.setIdeals("lawful");
        c.setBonds("people");
        c.setFlaws("mortal");
        c.setFeatAndTraits("stunning attack");
        
        characterService.insert(c);

        mvc.perform(get("/character/" + c.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()));
    }
    
    /**
     * Method to test valid character update
     * @throws Exception
     */
    @Test
    public void testValidCharacterUpdate() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        ObjectNode character = objectMapper.createObjectNode();
        character.put("id", c.getId());
        character.put("race", "dwarf");
        character.put("characterClass", "wizard");
        character.put("characterName", "foo");
        character.put("background", c.getBackground());
        character.put("alignment", c.getAlignment());
        character.put("personality", c.getPersonality());
        character.put("ideals", c.getIdeals());
        character.put("bonds", c.getBonds());
        character.put("flaws", c.getFlaws());
        character.put("featAndTraits", c.getFeatAndTraits());
        

        mvc.perform(put("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content(character.toString())
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()))
                .andExpect(jsonPath("$.race").value("dwarf"));
    }
    
    /**
     * Method to test valid character list
     * @throws Exception
     */
    @Test
    public void testValidCharacterList() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        mvc.perform(get("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(c.getId()))
                .andExpect(jsonPath("$[0].owner.id").value(u.getId()))
                .andExpect(jsonPath("$[0].characterClass").value(c.getCharacterClass()))
                .andExpect(jsonPath("$[0].race").value(c.getRace()));
    }
    
    /**
     * Method to test invalid character create without a session
     * @throws Exception
     */
    @Test
    public void testInvalidCharacterCreateNoSession() throws Exception {
        mvc.perform(post("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"race\": \"dwarf\"}"))
                .andExpect(status().isForbidden());
    }
    
    /**
     * Method to test character deletion
     * @throws Exception
     */
    @Test
    public void testValidCharacterDelete() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isOk());
    }
    
    /**
     * Method to test character deletion invalid 
     * @throws Exception
     */
    @Test
    public void testInvalidCharacterDeleteNotOwner() throws Exception {
        User owner = randomUser();
        User u = randomUser();

        Character c = randomCharacter(owner);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isForbidden());
    }
    
    /**
     * Method to test invalid character deletion with no session
     * @throws Exception
     */
    @Test
    public void testInvalidCharacterDeleteNotSession() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        mvc.perform(delete("/character/" + c.getId()))
                .andExpect(status().isForbidden());
    }
}