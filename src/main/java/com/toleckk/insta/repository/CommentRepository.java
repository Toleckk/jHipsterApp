package com.toleckk.insta.repository;

import com.toleckk.insta.domain.Comment;
import com.toleckk.insta.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select comment from Comment comment where comment.owner.login = ?#{principal.username}")
    List<Comment> findByOwnerIsCurrentUser();

    Page<Comment> findByOnIs(Pageable pageable, Post post);
}
