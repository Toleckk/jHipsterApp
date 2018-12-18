package com.toleckk.insta.repository;

import com.toleckk.insta.domain.Relationships;
import com.toleckk.insta.domain.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Relationships entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RelationshipsRepository extends JpaRepository<Relationships, Long> {

    @Query("select relationships from Relationships relationships where relationships.user.login = ?#{principal.username}")
    List<Relationships> findByUserIsCurrentUser();

    @Query("select relationships from Relationships relationships where relationships.subscriber.login = ?#{principal.username}")
    List<Relationships> findBySubscriberIsCurrentUser();

    List<Relationships> findBySubscriberIs(User user);

    List<Relationships> findByUserIs(User user);
}
