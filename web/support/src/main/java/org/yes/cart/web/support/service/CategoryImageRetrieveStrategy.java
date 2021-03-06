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

package org.yes.cart.web.support.service;

import org.yes.cart.domain.entity.Attributable;


/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 2011-May-17
 * Time: 13:02:49
 */
public interface CategoryImageRetrieveStrategy {

    /**
     * Get the image name
     *
     *
     * @param category category
     * @param attributeCodeHint attribute name hint (not guaranteed to be this attribute)
     * @param locale locale for image
     *
     * @return image name to show as category image
     */
    String getImageName(Attributable category, String attributeCodeHint, String locale);

    /**
     * Get image repository url pattern.
     *
     * @return image repository url pattern
     */
    String getImageRepositoryUrlPattern();

    /**
     * Get image attribute prefix.
     *
     * @return attribute prefix
     */
    String getImageAttributePrefix();

}
