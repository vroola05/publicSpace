package org.commonground.ps.backendapi.jpa.entities;

import java.sql.Timestamp;

import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@RevisionEntity
@Table(name="revinfo", schema="audit")
public class RevInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @RevisionNumber
    @Column(name="rev")
    private long rev;

    @RevisionTimestamp
    @Column(name="revtstmp")
    private Long revtstmp;
}