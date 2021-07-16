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

    public User randomUser() {
        User u = new User();
        u.setUsername(faker.name().firstName());
        u.setPassword(faker.pokemon().name());
        userService.insert(u);
        return u;
    }

    public Character randomCharacter(User u) {
        Faker faker = new Faker();
        Character c = new Character();
        c.setRace("elf");
        c.setCharacter_name(faker.name().fullName());
        c.setCharacter_class(faker.job().title());
        c.setOwner(u);
        characterService.insert(c);
        return c;
    }

    @Test
    public void testValidCharacterCreate() throws Exception {
        User u = randomUser();

        ObjectNode character = objectMapper.createObjectNode();
        character.put("race", "elf");
        character.put("character_class", "wizard");
        character.put("character_name", "foo");

        mvc.perform(post("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content(character.toString())
                .sessionAttr("user", u))
                .andExpect(status().isOk());
    }

    @Test
    public void testValidFindByCharacterId() throws Exception {
        User u = new User();
        u.setUsername("woo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(u);
        c.setCharacter_class("wizard");
        c.setCharacter_name("woobar");
        characterService.insert(c);

        mvc.perform(get("/character/" + c.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()));
    }

    @Test
    public void testValidCharacterUpdate() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        ObjectNode character = objectMapper.createObjectNode();
        character.put("id", c.getId());
        character.put("race", "dwarf");
        character.put("character_class", "wizard");
        character.put("character_name", "foo");

        mvc.perform(put("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content(character.toString())
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()))
                .andExpect(jsonPath("$.race").value("dwarf"));
    }

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
                .andExpect(jsonPath("$[0].character_class").value(c.getCharacter_class()))
                .andExpect(jsonPath("$[0].race").value(c.getRace()));
    }

    @Test
    public void testInvalidCharacterCreateNoSession() throws Exception {
        mvc.perform(post("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"race\": \"dwarf\"}"))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testValidCharacterDelete() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isOk());
    }

    @Test
    public void testInvalidCharacterDeleteNotOwner() throws Exception {
        User owner = randomUser();
        User u = randomUser();

        Character c = randomCharacter(owner);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testInvalidCharacterDeleteNotSession() throws Exception {
        User u = randomUser();
        Character c = randomCharacter(u);

        mvc.perform(delete("/character/" + c.getId()))
                .andExpect(status().isForbidden());
    }
}