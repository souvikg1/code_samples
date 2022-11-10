/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
const ejs = require('ejs');
const base64ToImage = require('base64-to-image');
const db = require('../../models');

const { sendEmail } = require('../../utils/email');

const User = db.users;
const EmployerProfile = db.employer_profiles;
const CandidateProfile = db.candidate_profiles;
const CompanySizes = db.company_sizes;
const HiringFrequency = db.hiring_frequency_master;
const EmployerPosition = db.employer_position_master;
const OrganizationTypes = db.organization_types_master;
const statusCode = require('../../utils/http-status-code');
const errorMessage = require('../../languages/employer');

// Update Employer
exports.emprOnboarding = async (req, res) => {
  try {
    const user_id = req.params.id;
    const {
      organization_name,
      organization_type_id,
      organization_size_id,
      position_type_id,
      how_do_you_hire_talent,
      hiring_frequency_type_id,
      signup_level,
    } = req.body;

    if (!user_id) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }

    if (signup_level == 2) {
      if (organization_name === null || organization_name === '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Employer Organization Name is required',
          data: [],
        });
      }
      await EmployerProfile.update({ organization_name, profile_completeness: 15 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level }, {
        where: {
          id: user_id,
        },
      });
    }

    if (signup_level == 3) {
      if (organization_type_id === null || organization_type_id === '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Employer Organization Type is required',
          data: [],
        });
      }
      await EmployerProfile.update({ organization_type_id, profile_completeness: 30 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level }, {
        where: {
          id: user_id,
        },
      });
    }

    if (signup_level == 4) {
      if (organization_size_id === null || organization_size_id === '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Employer Organization Size is required',
          data: [],
        });
      }
      await EmployerProfile.update({ organization_size_id, profile_completeness: 45 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level }, {
        where: {
          id: user_id,
        },
      });
    }

    if (signup_level == 5) {
      if (position_type_id === null || position_type_id === '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Employer Position is required',
          data: [],
        });
      }
      await EmployerProfile.update({ position_type_id, profile_completeness: 60 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level }, {
        where: {
          id: user_id,
        },
      });
    }

    if (signup_level == 6) {
      if (how_do_you_hire_talent === null || how_do_you_hire_talent === '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Organization Hiring Procedure is required',
          data: [],
        });
      }
      await EmployerProfile.update({ how_do_you_hire_talent, profile_completeness: 75 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level }, {
        where: {
          id: user_id,
        },
      });
    }

    if (signup_level == 7) {
      if (hiring_frequency_type_id == null || hiring_frequency_type_id == '') {
        return res.status(statusCode.BadRequest).json({
          message: 'Organization Hiring Frequency is required',
          data: [],
        });
      }
      await EmployerProfile.update({ hiring_frequency_type_id, profile_completeness: 90 }, {
        where: {
          user_id,
        },
      });
      await User.update({ signup_level, is_signup_complete: '1' }, {
        where: {
          id: user_id,
        },
      });
      const user = await User.findOne({
        where: {
          id: user_id,
        },
      });
      const otpObj = {
        message: 'Your Employer Profile is almost complete! Hurrah',
        email: req.body.email,
      };
      const { email } = user;
      const templateEjs = await ejs.renderFile('views/onboardCandidate.ejs', { otpObj });
      await sendEmail(email, 'support@test.com', 'Congratulation, Your Profile is almost complete', templateEjs);
    }
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateOrgName = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { organization_name } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,

      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      organization_name,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateHiringProcess = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { how_do_you_hire_talent } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      how_do_you_hire_talent,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateOrgType = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { organization_type_id } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      organization_type_id,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateOrgSize = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { organization_size_id } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      organization_size_id,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateEmprPosition = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { position_type_id } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      position_type_id,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.updateHiringFrequency = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { hiring_frequency_type_id } = req.body;
    const employerProfile = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    if (!employerProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    await EmployerProfile.update({
      hiring_frequency_type_id,
    }, {
      where: {
        user_id,
      },
    });
    return this.viewEmployer(req, res, user_id);
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

// Create Employer Profile Picture
exports.postEmprProfile = async (req, res) => {
  try {
    const { filename } = req.file;
    const { id } = req.params;
    const user_id = req.params.id;
    if (!user_id) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    const userExists = await User.findOne({
      where: {
        is_active: '1',
        is_deleted: '0',
        user_type: 'frontend',
        id,
      },
    });

    if (!userExists) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }

    const employerExists = await EmployerProfile.findOne({
      where: {
        user_id,
      },
    });
    const { profile_completeness } = employerExists;

    if (employerExists.profile_picture) {
      const userUpdateObject = {
        profile_picture: filename,
        // profile_completeness: profile_completeness + 7,
      };
      await EmployerProfile.update(userUpdateObject, {
        where: { user_id },
      });
    } else {
      const userUpdateObject = {
        profile_picture: filename,
        profile_completeness: profile_completeness + 7,
      };
      await EmployerProfile.update(userUpdateObject, {
        where: { user_id },
      });
    }

    return res.status(statusCode.Created).send({
      message: 'Profile Picture Uploaded Successfully!',
      url: `${process.env.API_BASE_URL}profile/${filename}`,
    });
  } catch (error) {
    return res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

// Create Employer Profile Picture using webcam
exports.postEmprProfileUsingBase64 = async (req, res) => {
  try {
    const { id } = req.params;
    const candidateProfile = await User.findOne({
      where: {
        is_active: '1',
        is_deleted: '0',
        user_type: 'frontend',
        id,
      },
    });

    if (!candidateProfile) {
      return res.status(statusCode.BadRequest).send({
        message: errorMessage.lblNotFoundUser,
      });
    }
    const { base64Str } = req.body;
    const path = './public/profile/';
    const filename = `${candidateProfile.first_name}_${Date.now()}`;
    const optionalObj = { fileName: filename, type: 'png' };
    await base64ToImage(base64Str, path, optionalObj);
    const profile_picture = `${optionalObj.fileName}.${optionalObj.type}`;

    const employerExists = await EmployerProfile.findOne({
      where: {
        user_id: id,
      },
    });

    const { profile_completeness } = employerExists;

    if (employerExists.profile_picture) {
      await EmployerProfile.update({
        profile_picture,
      }, {
        where: {
          user_id: id,
        },
      });
    } else {
      await EmployerProfile.update({
        profile_picture,
        profile_completeness: profile_completeness + 7,
      }, {
        where: {
          user_id: id,
        },
      });
    }
    res.status(statusCode.OK).send({
      message: 'Profile Picture Uploaded Successfully!',
      url: `${process.env.API_BASE_URL}profile/${filename}.png`,
    });
  } catch (error) {
    return res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};

exports.viewEmpr = async (req, res, user_id) => {
  try {
    const id = req.query.id || user_id;
    if (id) {
      const userInfo = await User.findOne({
        where: {
          id,
          is_deleted: '0',
        },
        include: [
          {
            model: EmployerProfile,
            required: true,
            where: {
              is_deleted: '0',
            },
            include: [
              {
                model: CompanySizes,
                required: false,
                where: {
                  is_deleted: '0',
                },
                attributes: [
                  'id', 'size',
                ],
              },
              {
                model: HiringFrequency,
                required: false,
                where: {
                  is_deleted: '0',
                },
                attributes: [
                  'id', 'type',
                ],
              },
              {
                model: EmployerPosition,
                required: false,
                where: {
                  is_deleted: '0',
                },
                attributes: [
                  'id', 'position',
                ],
              },
              {
                model: OrganizationTypes,
                required: false,
                where: {
                  is_deleted: '0',
                },
                attributes: [
                  'id', 'type',
                ],
              },
            ],
          },
        ],
        attributes: {
          exclude: ['password'],
        },
      });

      if (!userInfo) {
        return res.status(statusCode.NotFound).send({
          message: errorMessage.lblNotFoundUser,
        });
      }

      const candidateExist = await CandidateProfile.findOne({
        where: {
          user_id: id,
        },
      });

      const employerExist = await EmployerProfile.findOne({
        where: {
          user_id: id,
        },
      });

      const is_freelancer = Boolean(candidateExist);
      const is_employer = Boolean(employerExist);

      userInfo.dataValues.is_freelancer = is_freelancer;
      userInfo.dataValues.is_employer = is_employer;

      return res.status(statusCode.OK).json({
        message: 'Employer Data',
        userInfo,
      });
    }
    return res.status(statusCode.NotFound).send({
      message: errorMessage.lblNotFoundUser,
    });
  } catch (error) {
    res
      .status(statusCode.InternalServerError)
      .send({ message: error.message || errorMessage.lblInternalServerError });
  }
};
