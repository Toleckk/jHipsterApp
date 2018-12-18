package com.toleckk.insta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.toleckk.insta.domain.Relationships;
import com.toleckk.insta.repository.RelationshipsRepository;
import com.toleckk.insta.web.rest.errors.BadRequestAlertException;
import com.toleckk.insta.web.rest.util.HeaderUtil;
import com.toleckk.insta.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Relationships.
 */
@RestController
@RequestMapping("/api")
public class RelationshipsResource {

    private final Logger log = LoggerFactory.getLogger(RelationshipsResource.class);

    private static final String ENTITY_NAME = "relationships";

    private final RelationshipsRepository relationshipsRepository;

    public RelationshipsResource(RelationshipsRepository relationshipsRepository) {
        this.relationshipsRepository = relationshipsRepository;
    }

    /**
     * POST  /relationships : Create a new relationships.
     *
     * @param relationships the relationships to create
     * @return the ResponseEntity with status 201 (Created) and with body the new relationships, or with status 400 (Bad Request) if the relationships has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/relationships")
    @Timed
    public ResponseEntity<Relationships> createRelationships(@RequestBody Relationships relationships) throws URISyntaxException {
        log.debug("REST request to save Relationships : {}", relationships);
        if (relationships.getId() != null) {
            throw new BadRequestAlertException("A new relationships cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Relationships result = relationshipsRepository.save(relationships);
        return ResponseEntity.created(new URI("/api/relationships/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /relationships : Updates an existing relationships.
     *
     * @param relationships the relationships to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated relationships,
     * or with status 400 (Bad Request) if the relationships is not valid,
     * or with status 500 (Internal Server Error) if the relationships couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/relationships")
    @Timed
    public ResponseEntity<Relationships> updateRelationships(@RequestBody Relationships relationships) throws URISyntaxException {
        log.debug("REST request to update Relationships : {}", relationships);
        if (relationships.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Relationships result = relationshipsRepository.save(relationships);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, relationships.getId().toString()))
            .body(result);
    }

    /**
     * GET  /relationships : get all the relationships.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of relationships in body
     */
    @GetMapping("/relationships")
    @Timed
    public ResponseEntity<List<Relationships>> getAllRelationships(Pageable pageable) {
        log.debug("REST request to get a page of Relationships");
        Page<Relationships> page = relationshipsRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/relationships");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /relationships/:id : get the "id" relationships.
     *
     * @param id the id of the relationships to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the relationships, or with status 404 (Not Found)
     */
    @GetMapping("/relationships/{id}")
    @Timed
    public ResponseEntity<Relationships> getRelationships(@PathVariable Long id) {
        log.debug("REST request to get Relationships : {}", id);
        Optional<Relationships> relationships = relationshipsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(relationships);
    }

    /**
     * DELETE  /relationships/:id : delete the "id" relationships.
     *
     * @param id the id of the relationships to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/relationships/{id}")
    @Timed
    public ResponseEntity<Void> deleteRelationships(@PathVariable Long id) {
        log.debug("REST request to delete Relationships : {}", id);

        relationshipsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
