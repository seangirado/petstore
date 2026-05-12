import { Pet, PetRequest } from '../services/petService';
interface PetFormProps {
    initialPet?: Pet;
    onSubmit: (payload: PetRequest) => Promise<void>;
    submitLabel: string;
    submitting: boolean;
    errorMessage?: string;
}
export default function PetForm({ initialPet, onSubmit, submitLabel, submitting, errorMessage }: PetFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PetForm.d.ts.map