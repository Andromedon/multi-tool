import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from '../types/Product';
import {
  getBaseAmountInGrams,
  getColor,
  getProducts,
  getTargetAmount,
} from '../services/converter-service';
import { ProductUnit } from '../types/ProductUnit';
import { ConverterModel } from '../types/ConverterModel';

const title = 'Converter';
const rowStyle = {
  margin: '0.5rem',
};

const targetAmountRowStyle = {
  minHeight: '56px',
};

const buttonStyle = {
  width: 'fit-content',
  padding: '0.25rem',
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
};

const emptyConverterModel: ConverterModel = {
  UnitBase: ProductUnit.Grams,
  UnitTarget: ProductUnit.Grams,
  AmountBase: '',
  ProductBaseId: '',
  ProductTargetId: '',
  AmountTarget: [],
};

const Converter = () => {
  useEffect(() => {
    document.title = title;
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const [converterModel, setConverterModel] =
    useState<ConverterModel>(emptyConverterModel);

  const handleConvert = () => {
    const baseProduct = products.find(
      (p) => p.id === Number(converterModel?.ProductBaseId),
    );
    const targetProduct = products.find(
      (p) => p.id === Number(converterModel.ProductTargetId),
    );

    if (!baseProduct || !targetProduct || !converterModel.AmountBase) {
      return;
    }

    const baseUnitId = Number(converterModel.UnitBase);
    const baseAmountInGrams = getBaseAmountInGrams(
      Number(converterModel.AmountBase),
      baseUnitId,
      baseProduct!,
    );

    const targetAmountInGrams =
      (baseAmountInGrams * baseProduct!.concentration) /
      targetProduct!.concentration;

    const targetAmount = getTargetAmount(
      targetAmountInGrams,
      Number(converterModel.UnitTarget),
      baseProduct!,
    );

    setConverterModel({
      ...converterModel,
      AmountTarget: Array.from(targetAmount.toFixed(2)),
    });
  };

  const handleReset = () => {
    setConverterModel(emptyConverterModel);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className='container-fluid'>
        <div className='row' style={rowStyle}>
          <Card sx={{ minWidth: 275, background: '#d4eafd' }}>
            <CardContent>
              <div className='row' style={rowStyle}>
                <Typography variant='subtitle1' component='h3' sx={{ mb: 1 }}>
                  Converting from:
                </Typography>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle2' component='h4'>
                      Product
                    </Typography>
                    <Select
                      required
                      size='small'
                      labelId='product-select-label'
                      id='product'
                      value={converterModel?.ProductBaseId?.toString()}
                      onChange={(event: SelectChangeEvent<string>) => {
                        setConverterModel({
                          ...converterModel,
                          ProductBaseId: event.target.value,
                        });
                      }}
                      sx={{ backgroundColor: 'white' }}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <Typography variant='subtitle2' component='h3'>
                      Unit
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                      value={converterModel.UnitBase}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          UnitBase: Number(event.target.value),
                        });
                      }}
                    >
                      <FormControlLabel
                        value={ProductUnit.Grams}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Grams].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Milliliters}
                        control={<Radio />}
                        label={ProductUnit[
                          ProductUnit.Milliliters
                        ].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Glasses}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Glasses].toLowerCase()}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle2' component='h3'>
                      Amount
                    </Typography>
                    <TextField
                      required
                      size='small'
                      id='outlined-basic'
                      variant='outlined'
                      value={converterModel?.AmountBase}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      sx={{ backgroundColor: 'white' }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          AmountBase: event.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Box>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='row' style={rowStyle}>
          <Card sx={{ minWidth: 275, background: '#e3f2e3' }}>
            <CardContent>
              <div className='row' style={rowStyle}>
                <Typography variant='subtitle1' component='h3' sx={{ mb: 1 }}>
                  Converting to:
                </Typography>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle2' component='h4'>
                      Product
                    </Typography>
                    <Select
                      required
                      size='small'
                      labelId='product-select-label'
                      id='product'
                      value={converterModel?.ProductTargetId?.toString()}
                      onChange={(event: SelectChangeEvent<string>) => {
                        setConverterModel({
                          ...converterModel,
                          ProductTargetId: event.target.value,
                        });
                      }}
                      sx={{ backgroundColor: 'white' }}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <Typography variant='subtitle2' component='h3'>
                      Unit
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby='demo-row-radio-buttons-group-label'
                      name='row-radio-buttons-group'
                      value={converterModel.UnitTarget}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          UnitTarget: Number(event.target.value),
                        });
                      }}
                    >
                      <FormControlLabel
                        value={ProductUnit.Grams}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Grams].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Milliliters}
                        control={<Radio />}
                        label={ProductUnit[
                          ProductUnit.Milliliters
                        ].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Glasses}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Glasses].toLowerCase()}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle1' component='h3'>
                      Converted Amount
                    </Typography>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={targetAmountRowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='h3' component='h3'>
                      <strong>
                        {converterModel?.AmountTarget?.map((amountPart, i) => (
                          <span key={i} style={{ color: `${getColor(i)}` }}>
                            {amountPart}
                          </span>
                        ))}
                      </strong>
                    </Typography>
                  </FormControl>
                </Box>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='row' style={buttonRowStyle}>
          <div style={buttonStyle}>
            <Button
              size='large'
              variant='contained'
              color='error'
              onClick={handleReset}
            >
              Clear
            </Button>
          </div>
          <div style={buttonStyle}>
            <Button
              type='submit'
              size='large'
              variant='contained'
              onClick={handleConvert}
            >
              Convert
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Converter;
