package com.examples.simple.javascriptinteraction.dto;

import com.examples.simple.javascriptinteraction.enums.Status;
import lombok.Data;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotNull;

@Data
@Accessors(chain = true)
public class StatusDto {

    @NotNull
    private Status status;
}
