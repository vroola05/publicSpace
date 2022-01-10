package org.commonground.ps.backendapi.jpa.entities;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class ContractMainCategoryEntityId implements Serializable {
    

    @Column(name = "contract_id")
    private Long contractId;
 
    @Column(name = "main_category_id")
    private Long mainCategoryId;
 
    private ContractMainCategoryEntityId() {}
 
    public ContractMainCategoryEntityId(Long contractId, Long mainCategoryId) {
        this.contractId = contractId;
        this.mainCategoryId = mainCategoryId;
    }
 
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
 
        if (o == null || getClass() != o.getClass())
            return false;
 
        ContractMainCategoryEntityId that = (ContractMainCategoryEntityId) o;
        return Objects.equals(contractId, that.mainCategoryId) && Objects.equals(contractId, that.mainCategoryId);
    }
 
    @Override
    public int hashCode() {
        return Objects.hash(contractId, mainCategoryId);
    }
}
