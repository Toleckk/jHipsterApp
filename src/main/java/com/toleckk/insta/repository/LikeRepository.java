package com.toleckk.insta.repository;

import com.toleckk.insta.domain.Like;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Like entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LikeRepository extends JpaRepository<Like, Long> {

    @Query("select jhi_like from Like jhi_like where jhi_like.owner.login = ?#{principal.username}")
    List<Like> findByOwnerIsCurrentUser();

}
