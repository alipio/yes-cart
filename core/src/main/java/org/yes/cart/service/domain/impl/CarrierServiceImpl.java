package org.yes.cart.service.domain.impl;

import org.yes.cart.dao.GenericDAO;
import org.yes.cart.domain.entity.Carrier;
import org.yes.cart.domain.entity.CarrierSla;
import org.yes.cart.service.domain.CarrierService;

import java.util.ArrayList;
import java.util.List;

/**
* User: Igor Azarny iazarny@yahoo.com
 * Date: 09-May-2011
 * Time: 14:12:54
 */
public class CarrierServiceImpl extends BaseGenericServiceImpl<Carrier> implements CarrierService {

    /**
     * Construct service.
     * @param genericDao  doa to use.
     */
    public CarrierServiceImpl(final GenericDAO<Carrier, Long> genericDao) {
        super(genericDao);
    }

    /**
     * Find carriers, that can make delivery to given country and state.
     *
     * @param countryCode given country code.
     * @param stateCode   state code - optional.
     * @param city        city - optional.
     * @param currency currency to filter
     * @return list of carries with filtered SLA, that satisfy to given search criteria.
     */
    public List<Carrier> findCarriers(final String countryCode, final String stateCode, final String city, final String currency) {
        final List<Carrier> rez  = new ArrayList<Carrier>();
        rez.addAll(getGenericDao().findAll());
        filterByCurrency(rez, currency);
        return rez;  //Todo impl
    }

    /**
     * Filter list of curreiers and his SLA by currency.
     * @param currency currency to filter
     * @param carriers to filter
     */
    void filterByCurrency(final List<Carrier> carriers,  final String currency) {

        for (Carrier carrier : carriers) {
            final List<CarrierSla> toRemove = new ArrayList<CarrierSla>();
            for(CarrierSla carrierSla : carrier.getCarrierSla()) {
                if (!currency.endsWith(carrierSla.getCurrency())) {
                     toRemove.add(carrierSla);
                }
            }
            carrier.getCarrierSla().removeAll(toRemove);
        }

        //remove carriers with empty sla list.
        final List<Carrier> carriersToRemove = new ArrayList<Carrier>();
        for (Carrier carrier : carriers) {
            if(carrier.getCarrierSla().isEmpty()) {
                carriersToRemove.add(carrier);
            }
        }
        carriers.removeAll(carriersToRemove);


    }
}