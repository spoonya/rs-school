import { Container } from '@/components/shared';
import { Button, Input } from '@/components/ui';

export function UncontrolledFormPage() {
  return (
    <div>
      <Container>
        <h1>Uncontrolled Form</h1>
        <Input />
        <Button>Submit</Button>
      </Container>
    </div>
  );
}
