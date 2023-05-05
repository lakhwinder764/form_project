import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange, red } from '@mui/material/colors';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { collection, addDoc } from 'firebase/firestore';
import db from './firebase';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Grid,
  Button,
  Divider,
  MenuItem,
  Typography,
} from '@mui/material';
import DummyData from './DummyData';

const Form = ({ user, setUser }) => {
  const phoneRegex =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    DOB: Yup.string().required('Required'),
    Sex: Yup.string().required('Required'),
    Mobile: Yup.string()
      .matches(phoneRegex, 'Phone number is not valid')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    EmContact: Yup.string()
      .matches(phoneRegex, 'Phone number is not valid')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    PanID: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits'),
    // GovtID: Yup.string().when('IDType', {
    //          is: 'Aadhar Card',
    //          then: Yup.string().matches(/^[0-9]+$/, "Must be only digits")
    //          .min(12, 'Must be exactly 12 digits')
    //          .max(12, 'Must be exactly 12 digits'),
    //      }),
  });
  const formik = useFormik({
    initialValues: {
      Name: '',
      DOB: '',
      Sex: '',
      Mobile: '',
      IDType: '',
      GovtID: '',
      GuardianLabel: '',
      Guardian: '',
      Email: '',
      EmContact: '',
      Address: '',
      State: '',
      City: '',
      Country: '',
      Pincode: '',
      Occupation: '',
      Religion: '',
      MartialStatus: '',
      BloodGroup: '',
      Nationality: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await addDoc(collection(db, 'reactformik'), {
          Name: values.Name,
          DOB: values.DOB,
          Sex: values.Sex,
          Mobile: values.Mobile,
          IDType: values.IDType,
          GovtID: values.GovtID,
          GuardianLabel: values.GuardianLabel,
          Guardian: values.Guardian,
          Email: values.Email,
          EmContact: values.EmContact,
          Address: values.Address,
          State: values.State,
          City: values.City,
          Country: values.Country,
          Pincode: values.Pincode,
          Occupation: values.Occupation,
          Religion: values.Religion,
          MartialStatus: values.MartialStatus,
          BloodGroup: values.BloodGroup,
          Nationality: values.Nationality,
        });
        alert('form submitted');
        formik.handleReset();
        navigate('/details');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    },
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: orange[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });
  const navigate = useNavigate();
  const filteredData = DummyData.states.filter(
    (val) => val.label === formik.values.State
  );
  return (
    <ThemeProvider theme={theme}>
      <Box
        border="1px solid grey"
        p={3}
        m={3}
        backgroundColor="#FAF5EF"
        borderRadius={4}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography variant="h5" fontWeight="bold">
              Personal Details
            </Typography>
            <Divider color="black" width="180px" sx={{ mt: -0.9 }} />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box display="flex">
                Name <Box style={{ color: 'red' }}>*</Box>
              </Box>
              <Box m={3} width="450px">
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Name"
                  value={formik.values.Name}
                  onChange={(e) => formik.setFieldValue('Name', e.target.value)}
                  fullWidth
                  helperText={formik.touched.Name ? formik.errors.Name : ''}
                  error={Boolean(formik.errors.Name) && formik.touched.Name}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box display="flex" ml={2.1}>
                Date of Birth or Age<Box style={{ color: 'red' }}>*</Box>
              </Box>
              <Box m={3}>
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="DD/MM/YYYY or Age in Years"
                  value={formik.values.DOB}
                  onChange={(e) => formik.setFieldValue('DOB', e.target.value)}
                  sx={{
                    width: '250px',
                  }}
                  fullWidth
                  helperText={formik.touched.DOB ? formik.errors.DOB : ''}
                  error={Boolean(formik.errors.DOB) && formik.touched.DOB}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box display="flex">
                Sex <Box style={{ color: 'red' }}>*</Box>
              </Box>
              <Box width="400px" ml={2}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Enter Sex"
                  fullWidth
                  value={formik.values.Sex}
                  onChange={(e) => formik.setFieldValue('Sex', e.target.value)}
                  size="small"
                  helperText={formik.touched.Sex ? formik.errors.Sex : ''}
                  error={Boolean(formik.errors.Sex) && formik.touched.Sex}
                >
                  <MenuItem key="male" value="male">
                    Male
                  </MenuItem>
                  <MenuItem key="female" value="female">
                    Female
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Mobile</Box>
              <Box m={3} width="300px">
                <TextField
                  id="outlined-select-currency"
                  label=""
                  type="phone"
                  placeholder="Enter Mobile"
                  value={formik.values.Mobile}
                  onChange={(e) =>
                    formik.setFieldValue('Mobile', e.target.value)
                  }
                  error={Boolean(formik.errors.Mobile) && formik.touched.Mobile}
                  helperText={formik.touched.Mobile ? formik.errors.Mobile : ''}
                  fullWidth
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" alignItems="center">
              <Box ml={2.1}>Govt Issued ID</Box>
              <Box
                ml={8.5}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="250px">
                  <TextField
                    id="outlined-select-govtId"
                    select
                    label="ID Type"
                    size="small"
                    value={formik.values.IDType}
                    onChange={(e) =>
                      formik.setFieldValue('IDType', e.target.value)
                    }
                    fullWidth
                  >
                    <MenuItem key="Aadhar Card" value="Aadhar Card">
                      Aadhar Card
                    </MenuItem>
                    <MenuItem key="Voter ID Card" value="Voter ID Card">
                      Voter ID Card
                    </MenuItem>
                    <MenuItem key="Indian Passport" value="Indian Passport">
                      Indian Passport
                    </MenuItem>
                  </TextField>
                </Box>
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Govt Id"
                  value={formik.values.GovtID}
                  onChange={(e) =>
                    formik.setFieldValue('GovtID', e.target.value)
                  }
                  fullWidth
                  sx={{
                    m: 3,
                    width: '470px',
                  }}
                  helperText={formik.errors.GovtID}
                  error={formik.errors.GovtID}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h5" fontWeight="bold">
                Contact Details
              </Typography>
              <Divider color="black" width="180px" sx={{ mt: -0.9 }} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Guardian Details</Box>
              <Box
                ml={2.5}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box width="150px">
                  <TextField
                    id="outlined-select-guardian"
                    select
                    label="Enter Label"
                    size="small"
                    value={formik.values.GuardianLabel}
                    onChange={(e) =>
                      formik.setFieldValue('GuardianLabel', e.target.value)
                    }
                    fullWidth
                  >
                    <MenuItem key="Mr." value="Mr.">
                      Mr.
                    </MenuItem>
                    <MenuItem key="Mrs." value="Mrs.">
                      Mrs.
                    </MenuItem>
                  </TextField>
                </Box>
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Guardian Name"
                  value={formik.values.Guardian}
                  onChange={(e) =>
                    formik.setFieldValue('Guardian', e.target.value)
                  }
                  fullWidth
                  sx={{
                    m: 2,
                    width: '200px',
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Box>Email</Box>
              <Box m={3} width="350px">
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Email"
                  value={formik.values.Email}
                  onChange={(e) =>
                    formik.setFieldValue('Email', e.target.value)
                  }
                  fullWidth
                  type="email"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Emergency Contact Number</Box>
              <Box m={3} width="300px">
                <TextField
                  id="outlined-select-currency"
                  label=""
                  type="phone"
                  placeholder="Enter Emergency No"
                  fullWidth
                  value={formik.values.EmContact}
                  onChange={(e) =>
                    formik.setFieldValue('EmContact', e.target.value)
                  }
                  helperText={formik.errors.EmContact}
                  error={formik.errors.EmContact}
                  size="small"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column">
              <Typography variant="h5" fontWeight="bold">
                Address Details
              </Typography>
              <Divider color="black" width="180px" sx={{ mt: -0.9 }} />
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Address</Box>
              <Box m={3} width="350px">
                <TextField
                  multiline
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Address"
                  value={formik.values.Address}
                  onChange={(e) =>
                    formik.setFieldValue('Address', e.target.value)
                  }
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box ml={2.1}>State</Box>
              <Box ml={3} width="350px">
                <TextField
                  id="outlined-select-guardian"
                  select
                  label="Enter State"
                  size="small"
                  value={formik.values.State}
                  onChange={(e) =>
                    formik.setFieldValue('State', e.target.value)
                  }
                  fullWidth
                >
                  {DummyData?.states?.map((val) => (
                    <MenuItem key={val.label} value={val.value}>
                      {val.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>City</Box>
              <Box ml={2.5} width="250px">
                <TextField
                  id="outlined-select-guardian"
                  select
                  label="Enter Label"
                  size="small"
                  value={formik.values.City}
                  onChange={(e) => formik.setFieldValue('City', e.target.value)}
                  fullWidth
                >
                  {filteredData[0]?.city?.map((val) => (
                    <MenuItem key={val.label} value={val.value}>
                      {val.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Country</Box>
              <Box ml={2.5} width="250px">
                <TextField
                  id="outlined-select-country"
                  select
                  label="Enter Country"
                  size="small"
                  value={formik.values.Country}
                  onChange={(e) =>
                    formik.setFieldValue('Country', e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem key="India" value="India">
                    India
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box ml={2.1}>Pincode</Box>
              <Box ml={3} width="250px">
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter Pincode"
                  value={formik.values.Pincode}
                  onChange={(e) =>
                    formik.setFieldValue('Pincode', e.target.value)
                  }
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" mt={3}>
              <Typography variant="h5" fontWeight="bold">
                Other Details
              </Typography>
              <Divider color="black" width="180px" sx={{ mt: -0.9 }} />
            </Box>
          </Grid>
          <Grid item xs={3} direction="row">
            <Box display="flex" alignItems="center">
              <Box>Occupation</Box>
              <Box m={3} width="350px">
                <TextField
                  color="primary"
                  variant="outlined"
                  size="small"
                  placeholder="Enter occupation"
                  value={formik.values.Occupation}
                  onChange={(e) =>
                    formik.setFieldValue('Occupation', e.target.value)
                  }
                  fullWidth
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center">
              <Box ml={2.1}>Religion</Box>
              <Box ml={3} width="200px">
                <TextField
                  id="outlined-select-religion"
                  select
                  label="Enter Religion"
                  size="small"
                  value={formik.values.Religion}
                  onChange={(e) =>
                    formik.setFieldValue('Religion', e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem key="Christianity" value="Christianity">
                    Christianity
                  </MenuItem>
                  <MenuItem key="Islam" value="Islam">
                    Islam
                  </MenuItem>
                  <MenuItem key="Hinduism" value="Hinduism">
                    Hinduism
                  </MenuItem>
                  <MenuItem key="Buddhism" value="Buddhism">
                    Buddhism
                  </MenuItem>
                  <MenuItem key="Sikhism" value="Sikhism">
                    Sikhism
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center">
              <Box>Martial Status</Box>
              <Box ml={3} width="200px">
                <TextField
                  id="outlined-select-martialstatus"
                  select
                  label="Enter Martial Status"
                  size="small"
                  value={formik.values.MartialStatus}
                  onChange={(e) =>
                    formik.setFieldValue('MartialStatus', e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem key="Married" value="Married">
                    Married
                  </MenuItem>
                  <MenuItem key="Unmarried" value="Unmarried">
                    Unmarried
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box display="flex" alignItems="center">
              <Box>Blood Group</Box>
              <Box ml={3} width="200px">
                <TextField
                  id="outlined-select-blood-group"
                  select
                  label="Enter Blood Group"
                  size="small"
                  value={formik.values.BloodGroup}
                  onChange={(e) =>
                    formik.setFieldValue('BloodGroup', e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem key="A-" value="A-">
                    A-
                  </MenuItem>
                  <MenuItem key="B-" value="B-">
                    B-
                  </MenuItem>
                  <MenuItem key="AB-" value="AB-">
                    AB-
                  </MenuItem>
                  <MenuItem key="O-" value="O-">
                    O-
                  </MenuItem>
                  <MenuItem key="A+" value="A+">
                    A+
                  </MenuItem>
                  <MenuItem key="B+" value="B+">
                    B+
                  </MenuItem>
                  <MenuItem key="AB+" value="AB+">
                    AB+
                  </MenuItem>
                  <MenuItem key="O+" value="O+">
                    O+
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" alignItems="center">
              <Box>Nationality</Box>
              <Box ml={3} width="230px">
                <TextField
                  id="outlined-select-nationality"
                  select
                  label="Enter Nationality"
                  size="small"
                  value={formik.values.Nationality}
                  onChange={(e) =>
                    formik.setFieldValue('Nationality', e.target.value)
                  }
                  fullWidth
                >
                  <MenuItem key="India" value="India">
                    India
                  </MenuItem>
                </TextField>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          xs={12}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button color="error" variant="outlined" onClick={formik.handleReset}>
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            sx={{ ml: 3 }}
            onClick={formik.handleSubmit}
          >
            Submit
          </Button>
        </Grid>
      </Box>
      {/* <Box mt={5}>
        <Table data={user} />
      </Box> */}
    </ThemeProvider>
  );
};

export default Form;
