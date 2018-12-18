package com.toleckk.insta.repository;

import com.toleckk.insta.domain.Post;
import com.toleckk.insta.service.dto.UserDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Post entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("select post from Post post where post.user.login = ?#{principal.username}")
    List<Post> findByUserIsCurrentUser();

    @Query("select post from Post post where post.user.id = :userId")
    List<Post> findByUserIs(@Param("userId") Long userId);

    Page<Post> findByUserId(@Param("userId") Long userId, Pageable pageable);
}
