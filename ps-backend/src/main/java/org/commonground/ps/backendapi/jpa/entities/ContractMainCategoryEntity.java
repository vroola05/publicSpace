package org.commonground.ps.backendapi.jpa.entities;

import java.util.Objects;

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
public class ContractMainCategoryEntity {
    @EmbeddedId
    private ContractMainCategoryEntityId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("contractId")
    private ContractEntity contract;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("mainCategoryId")
    private MainCategoryEntity mainCategory;

    public ContractMainCategoryEntity(ContractEntity contractEntity, MainCategoryEntity mainCategoryEntity) {
        this.contract = contractEntity;
        this.mainCategory = mainCategoryEntity;

        this.id = new ContractMainCategoryEntityId(contract.getId(), mainCategory.getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        ContractMainCategoryEntity that = (ContractMainCategoryEntity) o;
        return Objects.equals(contract, that.contract) && Objects.equals(mainCategory, that.mainCategory);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(contract, mainCategory);
    }
}
