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
public class UserIntegrationTest {
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

        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"foo\", \"password\": \"bar\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("foo"))
                .andExpect(jsonPath("$.password").value("bar"));
    }

    @Test
    public void testLoggingInWithUserThatDoesNotExist() throws Exception {
        mvc.perform(post("/user/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\": \"foo\", \"password\": \"bar\"}"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testRegisterWithValidUser() throws Exception {
        mvc.perform(post("/user/register")
        	.contentType(MediaType.APPLICATION_JSON)
        	.content("{\"username\": \"bar\", \"password\": \"foo\"}"))
        	.andExpect(status().isOk())
        	.andExpect(jsonPath("$.username").value("bar"))
        	.andExpect(jsonPath("$.password").value("foo"));
    }

    @Test
    public void testRegisterWithInvalidUsername() throws Exception {
    	mvc.perform(post("/user/register")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content("{\"username\": \"a\", \"password\":\"test\"}"))
    			.andExpect(status().isConflict());
    }

    @Test
    public void testRegisterWithExistingUsername() throws Exception {
    	mvc.perform(post("/user/register")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content("{\"username\": \"foo\", \"password\": \"bar\"}"))
    			.andExpect(status().isConflict());
    }
    
    @Test
    public void testDeleteWithValidUser() throws Exception {
    	mvc.perform(delete("/user/{id}", "1")
    			.contentType(MediaType.APPLICATION_JSON))
    			.andExpect(status().isOk());
    			
    }
    
    @Test
    public void testDeleteWithUserThatDoesNotExist() throws Exception {
    	mvc.perform(delete("/user/{id}", "1")
    			.contentType(MediaType.APPLICATION_JSON))
    			.andExpect(status().isNotFound());
    }
    
    @Test
    public void updateUserWithValidUsername() throws Exception {
    	 User u = new User();
         u.setUsername("zoo");
         u.setPassword("animal");
         userService.insert(u);
    	
    	mvc.perform(put("/user")
    			.contentType(MediaType.APPLICATION_JSON)
    			.content("{\"id\": " + u.getId() +", \"username\": \"updatedName\", \"password\": \"test\"}"))
    			.andExpect(jsonPath("$.username").value("updatedName"))
    			.andExpect(jsonPath("$.password").value("test"))
    			.andExpect(status().isOk());
    			
    }
    
    
}