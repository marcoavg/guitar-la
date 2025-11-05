
import { useState } from "react";
import { categories } from "../data/categories";
import type { Activity } from "../types";
import type { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
    dispatch: React.Dispatch<ActivityActions>;
}


export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>({
        category: 1,
        name: '',
        calories: 0 
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const isNumberField = ['calories', 'category'].includes(e.target.id);
        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? Number(e.target.value) : e.target.value
        });
    }; 
    
    const isValidForm = () => {
        return activity.name.trim() !== '' && activity.calories > 0;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValidForm()) return;
        dispatch({
            type: 'save_activity',
            payload: { activity }
        });
        setActivity({
            category: 1,
            name: '',
            calories: 0 
        });
    }

  return (
    <form className="space-y-5 bg-gray-300 shadow p-10 rounded-lg"
        onSubmit={(e) => handleSubmit(e)}
    >
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="category" className="font-bold">Categorias:</label>
            <select 
                className="p-2 border border-gray-400 rounded-lg w-full bg-gray-900 text-white" 
                id="category" value={activity.category} 
                onChange={(e) => handleChange(e)}>
                {categories.map((category) => (
                    <option className="rounded-lg pb-2 pt-2 pl-4 pr-4 hover:bg-gray-700"
                        key={category.id} value={category.id}>{category.name}</option>
                ))}
                
            </select>
        </div>
        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="name" className="font-bold">Actividad:</label>
            <input 
                id="name"
                type="text"
                className="p-2 border border-slate-400 rounded-lg w-full"
                placeholder="Ej."
                value={activity.name}
                onChange={(e) => handleChange(e)}
            />
        </div>

        <div className="grid grid-cols-1 gap-3">
            <label htmlFor="calories" className="font-bold">Calorias:</label>
            <input 
                id="calories"
                type="number"
                className="p-2 border border-slate-400 rounded-lg w-full"
                placeholder="Ej. cal"
                value={activity.calories}
                onChange={(e) => handleChange(e)}
            />
        </div>

        <input 
            type="submit" 
            value={activity.category === 1 ? 'Agregar Comida' : 'Agregar Ejercicio'}
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg cursor-pointer w-full disabled:opacity-30"
            disabled={!isValidForm()}
        />
    </form>
  )
}
