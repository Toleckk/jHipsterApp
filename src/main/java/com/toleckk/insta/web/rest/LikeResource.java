package com.toleckk.insta.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.toleckk.insta.domain.Like;
import com.toleckk.insta.repository.LikeRepository;
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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Like.
 */
@RestController
@RequestMapping("/api")
public class LikeResource {

    private final Logger log = LoggerFactory.getLogger(LikeResource.class);

    private static final String ENTITY_NAME = "like";

    private final LikeRepository likeRepository;

    public LikeResource(LikeRepository likeRepository) {
        this.likeRepository = likeRepository;
    }

    /**
     * POST  /likes : Create a new like.
     *
     * @param like the like to create
     * @return the ResponseEntity with status 201 (Created) and with body the new like, or with status 400 (Bad Request) if the like has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/likes")
    @Timed
    public ResponseEntity<Like> createLike(@Valid @RequestBody Like like) throws URISyntaxException {
        log.debug("REST request to save Like : {}", like);
        if (like.getId() != null) {
            throw new BadRequestAlertException("A new like cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Like result = likeRepository.save(like);
        return ResponseEntity.created(new URI("/api/likes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /likes : Updates an existing like.
     *
     * @param like the like to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated like,
     * or with status 400 (Bad Request) if the like is not valid,
     * or with status 500 (Internal Server Error) if the like couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/likes")
    @Timed
    public ResponseEntity<Like> updateLike(@Valid @RequestBody Like like) throws URISyntaxException {
        log.debug("REST request to update Like : {}", like);
        if (like.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Like result = likeRepository.save(like);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, like.getId().toString()))
            .body(result);
    }

    /**
     * GET  /likes : get all the likes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of likes in body
     */
    @GetMapping("/likes")
    @Timed
    public ResponseEntity<List<Like>> getAllLikes(Pageable pageable) {
        log.debug("REST request to get a page of Likes");
        Page<Like> page = likeRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/likes");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /likes/:id : get the "id" like.
     *
     * @param id the id of the like to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the like, or with status 404 (Not Found)
     */
    @GetMapping("/likes/{id}")
    @Timed
    public ResponseEntity<Like> getLike(@PathVariable Long id) {
        log.debug("REST request to get Like : {}", id);
        Optional<Like> like = likeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(like);
    }

    /**
     * DELETE  /likes/:id : delete the "id" like.
     *
     * @param id the id of the like to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/likes/{id}")
    @Timed
    public ResponseEntity<Void> deleteLike(@PathVariable Long id) {
        log.debug("REST request to delete Like : {}", id);

        likeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
