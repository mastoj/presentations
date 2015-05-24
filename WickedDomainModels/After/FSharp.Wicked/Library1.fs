namespace FSharp.Wicked
open System

module Types = 
    type Id = Id of Guid
    type Entity<'T> = Id * 'T
    let createEntity state = Guid.NewGuid(), state

    type MemberState = 
        {
            FirstName: string
            LastName: string
            Email: string
        }
    type Member = Entity<MemberState>

    type ExpirationType = 
        | AssignmentExpiration of string * int
        | FixedExpiration of string * int

    type OfferType = 
        {
            Name: string
            ExpirationType: ExpirationType
            DaysValid: int
            BeginDate: DateTime option
        }

    type OfferState = 
        {
            OfferType: OfferType
            DateExpiring: DateTime
            Value: int
            Member: Member
        }
    type Offer = Entity<OfferState>

module OfferType = 
    open Types
    let CalculateExpirationDate offerType = 
        let fixedExpirationCalculation ot =
            match ot.BeginDate with
            | None -> raise (new InvalidOperationException())
            | Some d -> d.AddDays(float ot.DaysValid)

        let assignmentExpirationCalculation ot = 
            DateTime.Now.AddDays(float ot.DaysValid)

        match offerType.ExpirationType with
        | FixedExpiration _ -> fixedExpirationCalculation offerType
        | AssignmentExpiration _ -> assignmentExpirationCalculation offerType

module Member = 
    open Types
    open OfferType
    let FullName m = sprintf "%s %s" m.FirstName m.LastName

    let AssigneMemberToOfferType memberEntity offerType offerValueCalculator = 
        let dateExpiring = CalculateExpirationDate offerType
        let value = offerValueCalculator memberEntity offerType
        let offerState = 
            {  
                OfferType = offerType
                DateExpiring = dateExpiring
                Value = value
                Member = memberEntity
            }
        offerState |> createEntity
        
module OfferService =
    open Types
    open Member

    let assignOffer getMember getOfferType saveOffer offerValueCalculator memberId offerTypeId = 
        let memberEntity = getMember memberId
        let offerType = getOfferType offerTypeId
        let offer = AssigneMemberToOfferType memberEntity offerType offerValueCalculator
        saveOffer offer