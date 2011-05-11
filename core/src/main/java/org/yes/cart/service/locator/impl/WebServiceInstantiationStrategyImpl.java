package org.yes.cart.service.locator.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.yes.cart.service.locator.InstantiationStrategy;

import javax.xml.XMLConstants;
import javax.xml.namespace.QName;

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 09-May-2011
 * Time: 14:12:54
 */
public class WebServiceInstantiationStrategyImpl implements InstantiationStrategy {

    private static final Logger LOG = LoggerFactory.getLogger(WebServiceInstantiationStrategyImpl.class);

    private static final String NAMESPACE_URI = XMLConstants.NULL_NS_URI; // TODO is separate namespace need ?

/**
     * {@inheritDoc}
     */
    public <T> T getInstance(final String serviceUrl,
                             final Class<T> iface,
                             final String loginName,
                             final String password)  {
    //TODO use login & password 
        if(LOG.isDebugEnabled()) {
            LOG.debug("Get " + serviceUrl + " as " + iface.getName());
        }

        try {
            final QName qname = new QName(NAMESPACE_URI, getServiceName(serviceUrl));
            final javax.xml.ws.Service webServ = javax.xml.ws.Service.create(qname);
            return webServ.getPort(iface);
        } catch (Exception e) {
            final RuntimeException instantiationException = new RuntimeException("Service " +serviceUrl + " cannot be instantiated");
            instantiationException.initCause(e);
            throw instantiationException; // NOPMD
        }
    }




    String getServiceName(final String serviceUrl) {
        return serviceUrl.substring(serviceUrl.lastIndexOf('/') + 1);
    }




}