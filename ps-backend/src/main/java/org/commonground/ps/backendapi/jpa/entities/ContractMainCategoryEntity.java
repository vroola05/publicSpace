package org.commonground.ps.backendapi.jpa.entities;

import javax.persistence.*;

import org.hibernate.envers.Audited;
import org.hibernate.envers.RelationTargetAuditMode;

import lombok.Data;
import lombok.NoArgsConstructor;

@Audited(targetAuditMode = RelationTargetAuditMode.NOT_AUDITED)
@Data
@NoArgsConstructor
@Entity
@Table(name = "contract_main_category")
@NamedQuery(name = "ContractMainCategoryEntity.findAll", query="select c from ContractMainCategoryEntity c order by c.mainCategory.name asc")
public class ContractMainCategoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_contract_main_category_id")
    @SequenceGenerator(name = "seq_contract_main_category_id", sequenceName = "seq_contract_main_category_id", allocationSize = 1)
    private Long id;

    @ManyToOne()
    @JoinColumn(name="contract_id", referencedColumnName = "id")
    private ContractEntity contract;

    @ManyToOne()
    @JoinColumn(name="main_category_id", referencedColumnName = "id")
    private MainCategoryEntity mainCategory;
}
