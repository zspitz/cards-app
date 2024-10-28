import { Address } from "../types"

type Props = {
    address: Address
}

const ContactDetails = (: ) => {

    return (
        <div>
            {
                addressDetails.map(([detail, Icon, isAnchor, prefix], index) => (
                    <ContactDetail {...{ detail, Icon, isAnchor, prefix }} key={index} />
                ))
            }
        </div>
    )
}

export default ContactDetails