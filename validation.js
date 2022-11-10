/* eslint-disable consistent-return */
const _ = require('underscore');
const { check, validationResult } = require('express-validator');
const {
  lblInvalidUserId,
  lblInvalidOrganization,
  lblInvalidHireTalent,
  lblInvalidCompanySizeId,
  lblInvalidFrequencyTypeId,
  lblInvalidOrganizationTypeId,
  lblInvalidPostionTypeId,
} = require('../../languages/employer');

// Validate User Id
exports.validateUserId = [
  check('id', lblInvalidUserId).trim().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = _.pluck(errors.array(), 'msg');
      return res.status(422).json({ message: errMsg.join(', ') });
    }
    next();
  },
];

// Validate view Employer fields
exports.validateViewEmployer = [
  check('employer_id', lblInvalidUserId).trim().not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = _.pluck(errors.array(), 'msg');
      return res.status(422).json({ message: errMsg.join(', ') });
    }
    next();
  },
];

// Validate create Employer fields
exports.validateCreateEmployer = [
  check('hiring_frequency', 'Hiring frequency is required')
    .trim()
    .not()
    .isEmpty(),
  check('oraganization_type', 'oraganization_type is required')
    .trim()
    .not()
    .isEmpty(),
  check('organization_name', 'organization_name name is required')
    .trim()
    .not()
    .isEmpty(),
  check('position', 'position is required').trim().not().isEmpty(),
  check('user_id', 'User id is required').trim().not().isEmpty(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = _.pluck(errors.array(), 'msg');
      return res.status(422).json({ message: errMsg.join(', ') });
    }
    next();
  },
];

// Validate update Employer fields
exports.validateUpdateEmployer = [
  check('organization_name', lblInvalidOrganization).trim().not().isEmpty(),
  check('how_do_you_hire_talent', lblInvalidHireTalent).trim().not().isEmpty(),
  check('organization_size_id', lblInvalidCompanySizeId).trim().not().isEmpty()
    .isInt(),
  check('hiring_frequency_type_id', lblInvalidFrequencyTypeId).trim().not().isEmpty()
    .isInt(),
  check('organization_type_id', lblInvalidOrganizationTypeId).trim().not().isEmpty()
    .isInt(),
  check('position_type_id', lblInvalidPostionTypeId).trim().not().isEmpty()
    .isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = _.pluck(errors.array(), 'msg');
      return res.status(422).json({ message: errMsg.join(', ') });
    }
    next();
  },
];

// Validate delete Employer fields
exports.validateDeleteEmployer = [
  check('id', lblInvalidUserId).trim().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errMsg = _.pluck(errors.array(), 'msg');
      return res.status(422).json({ message: errMsg.join(', ') });
    }
    next();
  },
];
