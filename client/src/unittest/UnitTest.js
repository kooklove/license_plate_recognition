import { WebcamComponent } from './Webcam'
import { AccordionItem, AccordionHeader, AccordionBody, UncontrolledAccordion } from 'reactstrap';
import { RestApiComponent } from './RestApi';

export const UnitTest = () => {
  return (
    <>
      <div>
        <h5>LGE SW Architect 2022 Team 4</h5>
        <UncontrolledAccordion defaultOpen={["2"]}>
          <AccordionItem>
            <AccordionHeader targetId="1">
              Webcam Test
            </AccordionHeader>
            <AccordionBody accordionId="1">
              <WebcamComponent showDetail={true} />
            </AccordionBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">
              REST API
            </AccordionHeader>
            <AccordionBody accordionId="2">
              <RestApiComponent />
            </AccordionBody>
          </AccordionItem>
        </UncontrolledAccordion>
      </div>
    </>
  );
}

export default UnitTest;
