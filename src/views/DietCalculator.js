import React, {Component, useEffect, useState} from 'react';
import {GET_LIST} from 'react-admin';
import { Card, 
    CardContent, 
    FormControl, 
    Typography, 
    IconButton, 
    FormGroup, 
    FormLabel, 
    InputAdornment, 
    RadioGroup, 
    Radio, 
    FormControlLabel, 
    FormHelperText, 
    Input, 
    Checkbox,
    Divider,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { CallIcon } from '@material-ui/icons';
import {makeStyles} from "@material-ui/core/styles";
import restClient from "../providers/rest";

const useStyles = makeStyles({
    card: {
    },
    cardContent: {
        marginTop: '1em'
    },
    formControl: {
        marginRight: '1em'
    }
});

export const DietCalculator = () => {
  const classes = useStyles();
  const [data, setData] = React.useState({
    gender: 'female',
    activity: 'none',
    age: 0,
    weight: 0,
    height: 0,
    lbm: 0,
    ppm: 0,
    cpm: 0,
    meals: 3
  });
  const meals = {
    3: [{key: 'Śniadanie', value: 30}, {key: 'Obiad', value: 40}, {key: 'Kolacja', value: 30}],
    4: [{key: 'Śniadanie', value: 25}, {key: 'Drugie śniadanie', value: 10}, {key: 'Obiad', value: 35}, {key: 'Kolacja', value: 30}],
    5: [{key: 'Śniadanie', value: 30}, {key: 'Drugie śniadanie', value: 10}, {key: 'Obiad', value: 30}, {key: 'Podwieczorek', value: 10}, {key: 'Kolacja', value: 20}],
  }

  const calculateKcalForMeal = (cpm, percentage) => {
    return (cpm * percentage / 100).toFixed(0);
  }

  const calculateNutritients = (type, kcal, percentage) => {
    switch (type) {
        case 'proteins':
            return ((kcal * percentage / 100) / 4).toFixed(0);
        case 'fats':
            return ((kcal * percentage / 100) / 9).toFixed(0);
        case 'carbs':
            return ((kcal * percentage / 100) / 4).toFixed(0);
    }
  }

  const handleFormChange = (type) => (event) => {
    setData({...data, ...{[type]: event.target.value}});
  }

  useEffect(() => {
    const lbmFormula = (data) => {
        return ((data.gender === 'female' ? 1.07 : 1.1) * data.weight - ((data.gender === 'female' ? 148 : 128)*Math.pow((data.weight/data.height), 2))).toFixed(2);
    }

    const ppmFormula = (lbm) => {
        return (370 + (21.6 * lbm)).toFixed(2);
    }

    const cpmFormula = (ppm, activity) => {
        switch (activity) {
            case "none": 
                return (ppm * 1.2).toFixed(2);
            case "small": 
                return (ppm * 1.4).toFixed(2);
            case "medium": 
                return (ppm * 1.6).toFixed(2);
            case "large": 
                return (ppm * 1.8).toFixed(2);
            case "enormous": 
                return (ppm * 2.0).toFixed(2);
            default: 
                return 0;
        }
    }

    setData({
        ...data, 
        ...{
            lbm: lbmFormula(data), 
            ppm: ppmFormula(lbmFormula(data)),
            cpm: cpmFormula(ppmFormula(lbmFormula(data)), data.activity)
        }
    });
  }, [data.gender, data.age, data.weight, data.height, data.activity]);

  return (<div>
    <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Typography variant="h5">1. Wypełnij dane</Typography>
            <Divider />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel htmlFor="gender">Płeć</FormLabel>
                <RadioGroup name="gender" value={data.gender} onChange={handleFormChange('gender')}>
                    <FormControlLabel 
                        value="female"
                        control={<Radio />} 
                        label="Kobieta"
                    />
                    <FormControlLabel
                        value="male" 
                        control={<Radio />} 
                        label="Mężczyzna"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="age">Wiek</FormLabel>
                <FormGroup>
                    <Input onChange={handleFormChange('age')} value={data.age} required type="number" id="age" endAdornment={<InputAdornment position="end">lat</InputAdornment>}/>
                </FormGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="height">Wzrost</FormLabel>
                <FormGroup>
                    <Input onChange={handleFormChange('height')} value={data.height} required type="number" id="height" endAdornment={<InputAdornment position="end">cm</InputAdornment>} />
                </FormGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="weight">Waga</FormLabel>
                <FormGroup>
                    <Input onChange={handleFormChange('weight')} value={data.weight} required type="number" id="weight" endAdornment={<InputAdornment position="end">kg</InputAdornment>}/>
                </FormGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="lbm">Beztłuszczowa Masa Ciała</FormLabel>
                <FormGroup>
                    <Input disabled value={data.lbm} required type="number" id="lbm" endAdornment={<InputAdornment position="end">LBM</InputAdornment>}/>
                </FormGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="ppm">Podstawowa Przemiana Materii</FormLabel>
                <FormGroup>
                    <Input disabled value={data.ppm} required type="number" id="ppm" endAdornment={<InputAdornment position="end">PPM</InputAdornment>}/>
                </FormGroup>
            </FormControl>

        </CardContent>
        {data.ppm > 0 ? <>
        <CardContent className={classes.cardContent}>
            <Typography variant="h5">2. Wybierz współczynnik aktywności</Typography>
            <Divider />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel htmlFor="activity">Aktywność</FormLabel>
                <RadioGroup name="activity" value={data.activity} onChange={handleFormChange('activity')}>
                    <FormControlLabel 
                        value="none"
                        control={<Radio />} 
                        label="Brak aktywności fizycznej"
                    />
                    <FormControlLabel
                        value="small" 
                        control={<Radio />} 
                        label="Lekka aktywność (aktywność – ok. 140 minut tygodniowo)"
                    />
                    <FormControlLabel
                        value="medium" 
                        control={<Radio />} 
                        label="Średnia aktywność (aktywność – ok. 280 minut tygodniowo)"
                    />
                    <FormControlLabel
                        value="large" 
                        control={<Radio />} 
                        label="Wysoka aktywność (aktywność – ok. 420 minut tygodniowo)"
                    />
                    <FormControlLabel
                        value="enormous" 
                        control={<Radio />} 
                        label="Bardzo wysoka aktywność fizyczna (aktywność – ok. 560 minut tygodniowo)"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl className={classes.formControl}>
                <FormLabel htmlFor="cpm">Całkowita Przemiana Materii</FormLabel>
                <FormGroup>
                    <Input disabled value={data.cpm} required type="number" id="cpm" endAdornment={<InputAdornment position="end">CPM</InputAdornment>}/>
                </FormGroup>
            </FormControl>
        </CardContent>
        </> : null}
        {data.cpm > 0 ? <>
            <CardContent className={classes.cardContent}>
            <Typography variant="h5">3. Wybierz liczbę posiłków</Typography>
            <Divider />
        </CardContent>
        <CardContent className={classes.cardContent}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel htmlFor="meals">Liczba posiłków</FormLabel>
                <RadioGroup name="meals" value={data.meals} onChange={handleFormChange('meals')}>
                    <FormControlLabel 
                        value="3"
                        control={<Radio />} 
                        label="3 posiłki"
                    />
                    <FormControlLabel
                        value="4" 
                        control={<Radio />} 
                        label="4 posiłki"
                    />
                    <FormControlLabel
                        value="5" 
                        control={<Radio />} 
                        label="5 posiłków"
                    />
                </RadioGroup>
            </FormControl>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Typ posiłku</TableCell>
                            <TableCell>Kalorie</TableCell>
                            <TableCell>Tłuszcze (g)</TableCell>
                            <TableCell>Węglowodany (g)</TableCell>
                            <TableCell>Białka (g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {meals[data.meals].map((meal) => (
                            <TableRow>
                                <TableCell>{meal.key}</TableCell>
                                <TableCell>{calculateKcalForMeal(data.cpm, meal.value)}</TableCell>
                                <TableCell>{calculateNutritients('fats', calculateKcalForMeal(data.cpm, meal.value), 30)}</TableCell>
                                <TableCell>{calculateNutritients('carbs', calculateKcalForMeal(data.cpm, meal.value), 55)}</TableCell>
                                <TableCell>{calculateNutritients('proteins', calculateKcalForMeal(data.cpm, meal.value), 15)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </CardContent>
        </> : null}
    </Card>
  </div>);
};