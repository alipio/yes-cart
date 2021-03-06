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

/**
 * User: denispavlov
 * Date: 12-07-26
 * Time: 6:55 PM
 */
package org.yes.cart.impl {
[Bindable]
[RemoteClass(alias="org.yes.cart.domain.dto.impl.PromotionCouponDTOImpl")]
public class PromotionCouponDTOImpl {

    public var promotioncouponId:Number;

    public var promotionId:Number;

    public var code:String;

    public var usageLimit:Number;
    public var usageLimitPerCustomer:Number;
    public var usageCount:Number;


    public function PromotionCouponDTOImpl() {

    }
}
}
