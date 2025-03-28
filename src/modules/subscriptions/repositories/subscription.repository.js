// src/modules/subscriptions/repositories/subscription.repository.js
import BaseRepository from '../../../core/base-repository.js';
import Subscription from '../models/subscription.model.js';

/**
 * Repositorio para Subscription que extiende la funcionalidad básica.
 */

export default class SubscriptionRepository extends BaseRepository {
  constructor() {
    super(Subscription);
  }
  
  // Métodos específicos, por ejemplo, para actualizar el estado de la suscripción
}
