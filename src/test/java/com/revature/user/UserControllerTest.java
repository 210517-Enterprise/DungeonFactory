package com.revature.user;

import com.revature.DungeonFactoryApplication;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DungeonFactoryApplication.class)
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public class UserControllerTest {
    @Autowired
    MockMvc mvc;

    @Autowired
    UserService userService;

    @Test
    public void testLoggingInWithValidDetails() throws Exception {
        User u = new User();
        u.setUsername("foo");
        u.setPassword("bar");
        userService.insert(u);

        mvc.perform(post("/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"foo\", \"password\": \"bar\"}"))
                .andExpect(status().isOk())
        ;
    }

    @Test
    public void testLoggingInWithUserThatDoesNotExist() throws Exception {
        mvc.perform(post("/users/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"foo\", \"password\": \"bar\"}"))
                .andExpect(status().isNotFound())
        ;
    }
}