/*
 * Copyright 2009 Denys Pavlov, Igor Azarnyi
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

package org.yes.cart.payment.persistence.service;

import org.hibernate.criterion.Criterion;

import java.io.Serializable;
import java.util.List;

/**
 * Generic DAO service for payment modules.
 */
public interface PaymentModuleGenericDAO<T, PK extends Serializable> {

    /**
     * Find entity by Id.
     *
     * @param id   primary key
     * @param lock true if need lock for update.
     * @return instance of T or null if not found
     */
    T findById(PK id, boolean lock);

    /**
     * Find entity by Id.
     *
     * @param id primary key
     * @return instance of T or null if not found
     */
    T findById(PK id);

    /**
     * Get the All entities.
     *
     * @return lis tof all entities
     */
    List<T> findAll();

    /**
     * Find entities within named query .
     *
     * @param namedQueryName name of query
     * @param parameters     optional parameters for named query
     * @return list of found entities
     */
    List<T> findByNamedQuery(String namedQueryName, Object... parameters);

    /**
     * Find single entity, that returned by named query.
     *
     * @param namedQueryName name of query
     * @param parameters     optional parameters for named query
     * @return single entity   or null if not found
     */
    <T> T findSingleByNamedQuery(String namedQueryName, Object... parameters);

    /**
     * Find entities by criteria.
     *
     * @param criterion given criterias
     * @return list of found entities.
     */
    List<T> findByCriteria(Criterion... criterion);


    /**
     * Find entities by criteria.
     *
     * @param firstResult first result
     * @param maxResults max results
     * @param criterion given criteria
     *
     * @return list of found entities.
     */
    List<T> findByCriteria(int firstResult,
                           int maxResults,
                           Criterion... criterion);


    /**
     * Find single entity by criteria.
     *
     * @param criterion given criterias
     * @return single entity or null if not found.
     */
    T findSingleByCriteria(Criterion... criterion);

    /**
     * Persist the new enitity in DB.
     *
     * @param entity entity to persist
     * @return persisted entity.
     */
    T create(T entity);

    /**
     * Update the enitity in DB.
     *
     * @param entity entity to update
     * @return updated entity.
     */
    T update(T entity);

    /**
     * Save or update the entity. Please, use #create or #update instead of this method.
     *
     * @param entity entity to save
     *
     * @return saved entity
     */
    T saveOrUpdate(T entity);

    /**
     * Delete the given entity.
     *
     * @param entity to delete
     */
    void delete(T entity);


    /**
     * Find by hsql query.
     * @param hsqlQuery query
     * @param parameters parameters
     * @return list of objects.
     */
    List<Object> findByQuery(String hsqlQuery, Object... parameters);


}
