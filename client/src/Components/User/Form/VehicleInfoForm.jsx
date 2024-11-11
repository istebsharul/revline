import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';

const VehicleInfoForm = ({ setTransmission,vehicleData, setVehicleData, errors }) => {
    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [parts, setParts] = useState([]);

    // Generate the years from 2021 to 1917
    useEffect(() => {
        const startYear = 2021;
        const endYear = 1917;
        const yearsArray = [];
        for (let year = startYear; year >= endYear; year--) {
            yearsArray.push({ value: year, label: year });
        }
        setYears(yearsArray);
    }, []);

    // fetchMakes
    useEffect(() => {
        // console.log(vehicleData?.year);
        const fetchMakes = async() => {
            try {
                const response = await axios.get(`/api/v1/form/makes/${vehicleData.year}`);
                setMakes(response.data.makes);
                // console.log("Makes", response.data.makes);
            } catch (error) {
                console.error(error);
            }
        }
        if (vehicleData?.year) {
            fetchMakes();
        }
    },[vehicleData.year]);

    useEffect(()=>{
        if(vehicleData.make){
            const selectedMake = makes?.find((make) => make.name === vehicleData.make);
            // console.log("Models",selectedMake);
            setModels(selectedMake?.models);
        }
    },[vehicleData.make]);


    useEffect(()=>{
        if(vehicleData.make){
            // console.log(vehicleData.part);
            // console.log(models);
            const transmission = models?.find((model => model.name === vehicleData.model));
            setTransmission(transmission?.trims);
            // console.log("Transmission",transmission?.trims);
        }
    })

    // Fetching Parts
    useEffect(()=>{ 
        const fetchParts = async() =>{
            try {
                const response = await axios.get(`/api/v1/form/parts`);
                setParts(response.data);
                // console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        if(vehicleData.model){
            fetchParts();
        }
    },[vehicleData.model]);

    return (
        <div>
            <div className='space-y-2'>
                <div>
                    <label className="block text-gray-800 text-sm p-1">Year*</label>
                    <Select
                        className="w-full"
                        value={vehicleData.year ? { value: vehicleData.year, label: vehicleData.year } : null}
                        onChange={option => setVehicleData({ ...vehicleData, year: option ? option.value : '' })}
                        options={years}
                        placeholder="Select Year"
                    />
                    {errors.year && <p className="text-xs text-[#f6251a] mt-[0.2rem]">{errors.year}</p>}
                </div>

                <div>
                    <label className="block text-gray-800 text-sm p-1">Make*</label>
                    <Select
                        className="w-full"
                        value={vehicleData.make ? { value: vehicleData.make, label: vehicleData.make } : null}
                        onChange={option => setVehicleData({ ...vehicleData, make: option.value })}
                        options={makes.map(make => ({ value: make.name, label: make.name }))}
                        isDisabled={!vehicleData.year}
                        placeholder="Select Make"
                    />
                    {errors.make && <p className="text-xs text-[#f6251a] mt-[0.2rem]">{errors.make}</p>}
                </div>

                <div>
                    <label className="block text-gray-800 text-sm p-1">Model*</label>
                    <Select
                        className="w-full"
                        value={vehicleData.model ? { value: vehicleData.model, label: vehicleData.model } : null}
                        onChange={option => setVehicleData({ ...vehicleData, model: option.value })}
                        options={models?.map(model => ({value:model.name, label:model.name}))}
                        isDisabled={!vehicleData.make}
                        placeholder="Select Model"
                    />
                    {errors.model && <p className="text-xs text-[#f6251a] mt-[0.2rem]">{errors.model}</p>}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-800 text-sm p-1">Part*</label>
                    <Select
                        className="w-full"
                        value={vehicleData.part ? { value: vehicleData.part, label: vehicleData.part } : null}
                        onChange={option => setVehicleData({ ...vehicleData, part: option.value })}
                        options={parts.map(part => ({value:part.part_name,label: part.part_name}))}
                        isDisabled={!vehicleData.model}
                        placeholder="Select Part"
                    />
                    {errors.part && <p className="text-xs text-[#f6251a] mt-[0.2rem]">{errors.part}</p>}
                </div>
            </div>
        </div>
    );
};

export default VehicleInfoForm;
