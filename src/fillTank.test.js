'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('if the amount is not given, then full tank is ordered', () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 2);

    expect(customer.vehicle.fuelRemains).toBe(40);
  });

  it(
    'If the amount is greater'
      + ' than the tank can accommodate, pour only what will fit',
    () => {
      const customer = {
        money: 3000,
        vehicle: {
          maxTankCapacity: 40,
          fuelRemains: 8,
        },
      };

      fillTank(customer, 2, 50);

      expect(customer.vehicle.fuelRemains).toBe(40);
    }
  );

  it('always fill in only what the client can pay', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10, 40);

    expect(customer.vehicle.fuelRemains).toBe(11);
  });

  it('round the poured amount by discarding number to the tenth part', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8.6,
      },
    };

    fillTank(customer, 10, 11.2);

    expect(customer.vehicle.fuelRemains).toBe(11.6);
  });

  it('if the poured amount is less than 2 liters, do not pour at all', () => {
    const customer = {
      money: 30,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 16, 40);

    expect(customer.vehicle.fuelRemains).toBe(8);
  });

  it('round the price of the purchased fuel'
    + 'the to the nearest hundredth part', () => {
    const customer = {
      money: 305.3,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 16.2, 40);

    expect(customer.money).toBe(0.74);
  });
});
