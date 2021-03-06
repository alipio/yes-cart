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

package org.yes.cart.domain.i18n.impl;

import org.apache.commons.lang.StringUtils;
import org.yes.cart.domain.i18n.I18NModel;

import java.util.HashMap;
import java.util.Map;

/**
 * User: denispavlov
 * Date: 12-08-08
 * Time: 8:26 PM
 */
public class StringI18NModel implements I18NModel {

    public static final String SEPARATOR = "#~#";

    private final Map<String, String> values = new HashMap<String, String>();

    public StringI18NModel(final Map<String, String> values) {
        if (values != null && !values.isEmpty()) {
            this.values.putAll(values);
        }
    }

    public StringI18NModel(final String raw) {
        if (raw != null && raw.length() > 0) {
            final String[] valuePairs = StringUtils.splitByWholeSeparatorPreserveAllTokens(raw, SEPARATOR);
            for (int i = 0; i < valuePairs.length - 1; i+=2)  {
                final String key = valuePairs[i];
                final String value = valuePairs[i + 1];
                if (value != null && value.length() > 0) {
                    values.put(key, value);
                }
            }
        }
    }

    public StringI18NModel() {
    }

    /** {@inheritDoc} */
    public String getValue(final String locale) {
        return values.get(locale);
    }

    /** {@inheritDoc} */
    public void putValue(final String locale, final String value) {
        values.put(locale, value);
    }

    /** {@inheritDoc} */
    public Map<String, String> getAllValues() {
        return values;
    }

    /** {@inheritDoc} */
    @Override
    public String toString() {
        final StringBuilder out = new StringBuilder();
        for (final Map.Entry<String, String> entry : values.entrySet()) {
            if (StringUtils.isNotBlank(entry.getValue())) {
                out.append(entry.getKey()).append(SEPARATOR).append(entry.getValue()).append(SEPARATOR);
            }
        }
        return out.toString();
    }
}
