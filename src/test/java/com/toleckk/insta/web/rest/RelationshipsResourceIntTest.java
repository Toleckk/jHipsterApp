package com.toleckk.insta.web.rest;

import com.toleckk.insta.JhipstercleanApp;

import com.toleckk.insta.domain.Relationships;
import com.toleckk.insta.repository.RelationshipsRepository;
import com.toleckk.insta.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.toleckk.insta.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RelationshipsResource REST controller.
 *
 * @see RelationshipsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipstercleanApp.class)
public class RelationshipsResourceIntTest {

    @Autowired
    private RelationshipsRepository relationshipsRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRelationshipsMockMvc;

    private Relationships relationships;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RelationshipsResource relationshipsResource = new RelationshipsResource(relationshipsRepository);
        this.restRelationshipsMockMvc = MockMvcBuilders.standaloneSetup(relationshipsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Relationships createEntity(EntityManager em) {
        Relationships relationships = new Relationships();
        return relationships;
    }

    @Before
    public void initTest() {
        relationships = createEntity(em);
    }

    @Test
    @Transactional
    public void createRelationships() throws Exception {
        int databaseSizeBeforeCreate = relationshipsRepository.findAll().size();

        // Create the Relationships
        restRelationshipsMockMvc.perform(post("/api/relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relationships)))
            .andExpect(status().isCreated());

        // Validate the Relationships in the database
        List<Relationships> relationshipsList = relationshipsRepository.findAll();
        assertThat(relationshipsList).hasSize(databaseSizeBeforeCreate + 1);
        Relationships testRelationships = relationshipsList.get(relationshipsList.size() - 1);
    }

    @Test
    @Transactional
    public void createRelationshipsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = relationshipsRepository.findAll().size();

        // Create the Relationships with an existing ID
        relationships.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRelationshipsMockMvc.perform(post("/api/relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relationships)))
            .andExpect(status().isBadRequest());

        // Validate the Relationships in the database
        List<Relationships> relationshipsList = relationshipsRepository.findAll();
        assertThat(relationshipsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRelationships() throws Exception {
        // Initialize the database
        relationshipsRepository.saveAndFlush(relationships);

        // Get all the relationshipsList
        restRelationshipsMockMvc.perform(get("/api/relationships?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(relationships.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getRelationships() throws Exception {
        // Initialize the database
        relationshipsRepository.saveAndFlush(relationships);

        // Get the relationships
        restRelationshipsMockMvc.perform(get("/api/relationships/{id}", relationships.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(relationships.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingRelationships() throws Exception {
        // Get the relationships
        restRelationshipsMockMvc.perform(get("/api/relationships/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRelationships() throws Exception {
        // Initialize the database
        relationshipsRepository.saveAndFlush(relationships);

        int databaseSizeBeforeUpdate = relationshipsRepository.findAll().size();

        // Update the relationships
        Relationships updatedRelationships = relationshipsRepository.findById(relationships.getId()).get();
        // Disconnect from session so that the updates on updatedRelationships are not directly saved in db
        em.detach(updatedRelationships);

        restRelationshipsMockMvc.perform(put("/api/relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedRelationships)))
            .andExpect(status().isOk());

        // Validate the Relationships in the database
        List<Relationships> relationshipsList = relationshipsRepository.findAll();
        assertThat(relationshipsList).hasSize(databaseSizeBeforeUpdate);
        Relationships testRelationships = relationshipsList.get(relationshipsList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingRelationships() throws Exception {
        int databaseSizeBeforeUpdate = relationshipsRepository.findAll().size();

        // Create the Relationships

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restRelationshipsMockMvc.perform(put("/api/relationships")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(relationships)))
            .andExpect(status().isBadRequest());

        // Validate the Relationships in the database
        List<Relationships> relationshipsList = relationshipsRepository.findAll();
        assertThat(relationshipsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteRelationships() throws Exception {
        // Initialize the database
        relationshipsRepository.saveAndFlush(relationships);

        int databaseSizeBeforeDelete = relationshipsRepository.findAll().size();

        // Get the relationships
        restRelationshipsMockMvc.perform(delete("/api/relationships/{id}", relationships.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Relationships> relationshipsList = relationshipsRepository.findAll();
        assertThat(relationshipsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Relationships.class);
        Relationships relationships1 = new Relationships();
        relationships1.setId(1L);
        Relationships relationships2 = new Relationships();
        relationships2.setId(relationships1.getId());
        assertThat(relationships1).isEqualTo(relationships2);
        relationships2.setId(2L);
        assertThat(relationships1).isNotEqualTo(relationships2);
        relationships1.setId(null);
        assertThat(relationships1).isNotEqualTo(relationships2);
    }
}
