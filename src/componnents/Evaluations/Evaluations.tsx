import React, { useEffect, useState } from 'react';
import './Evaluations.css';
import value from '../../assets/images/home/value.webp';
import EvaluationItem from '../EvaluationItem/EvaluationItem';
import TitleSection from '../TitleSection/TitleSection';

interface Evaluations {
    id: number;
    icon: string;
    title: string;
    description: string;
}

const Evaluations: React.FC = () => {
    const [evaluations, setEvaluations] = useState<Evaluations[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/evaluations')
            .then(response => response.json())
            .then(data => setEvaluations(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className='AB_ContainerEvaluations'>

            <TitleSection title_section=" قيمنا" className='HJ_DirectionLeft' />

            <div className="AB_Evaluations-Section">
                <div className="AB_tree-image">
                    <img src={value} alt="Tree" />
                </div>
                <div className="AB_AllEvalutions">
                    {evaluations.map((evaluation, index) => (
                        <EvaluationItem
                            key={evaluation.id}
                            icon={evaluation.icon}
                            title={evaluation.title}
                            description={evaluation.description}
                            className={index % 2 !== 0 ? ' AB_left' : ''}
                        />
                    ))}
                </div>
            </div>

        </div>

    );
};

export default Evaluations;
