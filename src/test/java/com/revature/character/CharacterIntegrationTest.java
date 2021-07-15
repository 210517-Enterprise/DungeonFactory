package com.revature.character;

import com.revature.DungeonFactoryApplication;
import com.revature.user.User;
import com.revature.user.UserService;
import org.junit.Test;
import static org.junit.Assert.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

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

    @Test
    public void testValidCharacterCreate() throws Exception {
        User u = new User();
        u.setUsername("too");
        u.setPassword("bar");
        userService.insert(u);

        mvc.perform(post("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"race\": \"dwarf\"}")
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
        characterService.insert(c);

        mvc.perform(get("/character/" + c.getId())
                .contentType(MediaType.APPLICATION_JSON)
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()));
    }

    @Test
    public void testValidCharacterUpdate() throws Exception {
        User u = new User();
        u.setUsername("soo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(u);
        characterService.insert(c);

        mvc.perform(put("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"id\": \" " + c.getId() + "\",\"race\": \"dwarf\"}")
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(c.getId()))
                .andExpect(jsonPath("$.race").value("dwarf"));
    }

    @Test
    public void testValidCharacterList() throws Exception {
        User u = new User();
        u.setUsername("roo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(u);
        characterService.insert(c);

        mvc.perform(get("/character")
                .contentType(MediaType.APPLICATION_JSON)
                .sessionAttr("user", u))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(c.getId()))
                .andExpect(jsonPath("$[0].owner.id").value(u.getId()))
                .andExpect(jsonPath("$[0].race").value("elf"));
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
        User u = new User();
        u.setUsername("foo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(u);
        characterService.insert(c);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isOk());
    }

    @Test
    public void testInvalidCharacterDeleteNotOwner() throws Exception {
        User owner = new User();
        owner.setUsername("zoo");
        owner.setPassword("bar");
        userService.insert(owner);

        User u = new User();
        u.setUsername("moo");
        u.setPassword("bar");
        userService.insert(u);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(owner);
        characterService.insert(c);

        mvc.perform(delete("/character/" + c.getId())
                .sessionAttr("user", u))
                .andExpect(status().isForbidden());
    }

    @Test
    public void testInvalidCharacterDeleteNotSession() throws Exception {
        User owner = new User();
        owner.setUsername("noo");
        owner.setPassword("bar");
        userService.insert(owner);

        Character c = new Character();
        c.setRace("elf");
        c.setOwner(owner);
        characterService.insert(c);

        mvc.perform(delete("/character/" + c.getId()))
                .andExpect(status().isForbidden());
    }
}